# Playwright POM Automation Framework

This project is a JavaScript Playwright automation framework using the Page Object Model (POM) pattern. It features:

- **Page Objects**: Encapsulate locators and page structure in `pageObjects/`
- **Action Wrappers**: Encapsulate business actions in `actionWrappers/`
- **Tests**: Test cases in `tests/`
- **Environment Configs**: Separate configs for dev, staging, prod in `config/`

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run tests (default: dev):**
   ```sh
   npx playwright test
   ```

3. **Run tests for a specific environment:**
   ```sh
   TEST_ENV=staging npx playwright test
   TEST_ENV=prod npx playwright test
   ```

## Project Structure

```
pageObjects/        # Page Object classes (locators)
actionWrappers/     # Action wrapper classes (user actions)
tests/              # Test classes
config/             # Environment configs (dev, staging, prod)
playwright.config.js# Playwright config with env support
```

## Example
- `LoginPage.js`: Page object for login page
- `LoginActions.js`: Wrapper for login actions
- `login.spec.js`: Sample test using POM and action wrapper

## Notes
- Update URLs and selectors in config and page objects as per your application.
- Extend the framework by adding more page objects, actions, and tests.
