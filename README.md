# ILA

ILA (Initialize Lambda Application) is a CLI tool used to initialize a fresh NodeJS Lambda Application with best practices.

## How to Use

Using ILA is super easy.

1. **Install ILA globally.**

   ```shell
   npm i -g ila
   ```

2. **cd into the root of your Lambda application and run:**

   ```shell
   ila
   ```

3. **Let ILA do it's thing.**

# What ILA does

- Installs the aws-sdk
- Installs and configure Husky (default requirement is 90% test coverage)
- Installs and configures eslint/prettier with Airbnb standards
- Installs lamda-local for local development
- Configures script commands
- Removes excessive boilerplate
- A few other small things
