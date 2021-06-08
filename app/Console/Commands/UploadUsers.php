<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;
use League\Csv\Exception;
use League\Csv\Reader;
use League\Csv\Statement;

class UploadUsers extends Command
{
    protected $signature = 'admin:upload-users {path_to_csv}';

    protected $description = 'Create or update users. Please user the following column names on the csv - first_name, last_name, phone_numbers, email, is_admin';

    private $progressBar;

    const CSV_HEADERS = ['first_name', 'last_name', 'email', 'is_admin', 'phone_numbers'];

    /**
     * @throws Exception
     */
    public function handle()
    {
        list($csv, $usersCount) = $this->fetchRecordsAndCount();

        if ($this->hasAllHeaders($csv->getHeader())) {
            throw new Exception('Invalid CSV');
        }

        $batchCount = (int) floor($usersCount / 10 + (($usersCount % 10) !== 0 ? 1: 0));

        $this->info('uploading users');

        $this->progressBar = $this->output->createProgressBar($batchCount);
        $this->progressBar->start();

        $initialBatchNumber = 1;
        $initialBatchOffset = 0;

        while ($initialBatchNumber <= $batchCount) {
            $users = LazyCollection::make((new Statement())->offset($initialBatchOffset)->limit(10)->process($csv));
            $uniqueColumn = $this->isIdProvided($csv->getHeader()) ? 'id' : 'email';

            DB::transaction(function () use ($users, $uniqueColumn){
                $users->each(function ($user) use ($uniqueColumn) {
                    $existingUser = User::where($uniqueColumn, $user[$uniqueColumn])->first();

                    if (! $existingUser) {
                        $this->saveUser($user);

                        return;
                    }

                    $this->updateUser($existingUser, $user, $uniqueColumn);
                });
            });

            $this->progressBar->advance();

            $initialBatchNumber ++;
            $initialBatchOffset += 10;
        }

        $this->progressBar->finish();

        $this->info(PHP_EOL. 'Users uploaded successfully!');
    }

    private function hasAllHeaders($headers): bool
    {
        if (count(array_intersect($headers, self::CSV_HEADERS)) > 0){
            return false;
        }

        return true;
    }

    private function fetchRecordsAndCount(): array
    {
        $csv = Reader::createFromPath($this->argument('path_to_csv'), 'r');
        $csv->setHeaderOffset(0);
        $csv->skipEmptyRecords();

        $usersCount = (new Statement())->process($csv)->count();

        return [$csv, $usersCount];
    }

    private function isIdProvided(array $headers): bool
    {
        return in_array('id', $headers);
    }

    private function trimPhoneNumbers(array $user): ?array
    {
        if (! $user['phone_numbers']) {
            return [];
        }

        return array_map('trim', explode(',', $user['phone_numbers']));
    }

    private function fetchPhoneNumbers(array $phoneNumbers): array
    {
        if (! $phoneNumbers) {
            return [];
        }

        return array_map(function ($phoneNumber) {
            return new PhoneNumber(['phone_number' => $phoneNumber]);
        }, $phoneNumbers);
    }

    private function filterUserRecord($user): array
    {
        return array_filter($user, static function($value) { return !is_null($value) && $value !== ''; });
    }

    private function saveUser(array $user): void
    {
        $newUser = User::create(array_merge($this->filterUserRecord($user), ['password' => config('auth.default_password')]));

        $newUser->phoneNumbers()->saveMany($this->fetchPhoneNumbers($this->trimPhoneNumbers($user)));
    }

    private function updateUser(User $existingUser, array $user, $uniqueColumn)
    {
        $newValues = Arr::except($this->filterUserRecord($user), ['id']);

        $emailIfNotUnique = ($uniqueColumn !== 'id' && Arr::has($newValues, 'email')) ? ['email' => $user['email']] : [];
        $valuesToBeUpdated = array_merge($newValues, $emailIfNotUnique);

        $existingUser->update($valuesToBeUpdated);

        $existingPhoneNumbers = $existingUser->phoneNumbers()->pluck('phone_number')->toArray();

        $toBeDeleted = array_diff($existingPhoneNumbers, $this->trimPhoneNumbers($user));
        $toBeAdded = array_diff($this->trimPhoneNumbers($user), $existingPhoneNumbers);

        $existingUser->phoneNumbers()->saveMany($this->fetchPhoneNumbers($toBeAdded));
        $existingUser->phoneNumbers()->whereIn('phone_number', $toBeDeleted)->delete();
    }
}
