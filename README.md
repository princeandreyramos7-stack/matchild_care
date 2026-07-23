# Maternal & Child Care Management System

A comprehensive web-based system for managing maternal and child healthcare records, built with Laravel and React.

## Features

### Patient Portal
- **Dashboard** - Educational videos, health articles, and pregnancy tips
- **Medical Records** - Complete prenatal care history and assessments
- **Notifications** - Appointment reminders and health guidance
- **Profile Management** - Update personal information and settings

### Healthcare Provider Portal
- **Maternal Care Management** - Track prenatal visits, assessments, and delivery information
- **Patient Management** - Register and manage patient accounts
- **Child Immunization** - Track vaccination schedules and records
- **SMS Notifications** - Automated appointment reminders via PhilSMS

## Tech Stack

- **Backend**: Laravel 11
- **Frontend**: React with Inertia.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: MySQL
- **SMS**: PhilSMS Integration

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd matchild_care
```

2. Install dependencies:
```bash
composer install
npm install
```

3. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Set up database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Run migrations and seeders:
```bash
php artisan migrate --seed
```

6. Build assets:
```bash
npm run build
```

7. Start the development server:
```bash
php artisan serve
```

## Default User Accounts

### Admin Account
- **Email**: admin@maternal.com
- **Password**: password
- **Role**: Administrator

### Health Worker Account
- **Email**: worker@maternal.com
- **Password**: password
- **Role**: Health Worker

### Patient Account
- **Email**: patient@maternal.com
- **Password**: password
- **Role**: Patient

### Test Account
- **Email**: joe@gmail.com
- **Password**: password
- **Role**: Patient

## SMS Configuration

### Current Provider: Semaphore
The system is configured to use Semaphore SMS API with sender name "Matcare".

**SMS Features:**
- ✅ Login credentials sent on patient registration
- ✅ Appointment reminders (7 days after registration, 4 weeks after visits)
- ✅ Visit completion notifications

**Quick Test:**
```bash
php artisan sms:test 09123456789
```

**Documentation:** See [docs/SMS_DOCUMENTATION_INDEX.md](docs/SMS_DOCUMENTATION_INDEX.md) for complete SMS documentation.

**Quick Start:** See [docs/SMS_QUICK_REFERENCE.md](docs/SMS_QUICK_REFERENCE.md) for commands and reference.

## Documentation

All documentation is organized in the `/docs` folder:

### SMS Documentation (Start Here!)
- **[SMS_DOCUMENTATION_INDEX.md](docs/SMS_DOCUMENTATION_INDEX.md)** - Master SMS documentation index
- **[SMS_QUICK_REFERENCE.md](docs/SMS_QUICK_REFERENCE.md)** - Quick reference card
- **[SMS_WORKFLOW_SUMMARY.md](docs/SMS_WORKFLOW_SUMMARY.md)** - System overview

### Setup Guides
- **[SEMAPHORE_SETUP_GUIDE.md](docs/SEMAPHORE_SETUP_GUIDE.md)** - Current SMS provider setup
- **[SMS_TESTING_QUICKSTART.md](docs/SMS_TESTING_QUICKSTART.md)** - Quick testing guide
- **[COMPLETE_SMS_WORKFLOW_GUIDE.md](docs/COMPLETE_SMS_WORKFLOW_GUIDE.md)** - Detailed workflow

### Other Documentation
- Complete Project Summary
- SMS Implementation Guide
- Alternative SMS Provider Setup (UniSMS, PhilSMS)

## License

This project is proprietary software for healthcare management.

## Support

For issues and questions, please contact the development team.
