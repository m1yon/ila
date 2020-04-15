# **ILA**

ILA (Initialize Lambda Application) is a CLI tool used to initialize a fresh NodeJS Lambda Application with (my perceived) best practices. This tool is fairly opinionated, as it's meant to match the use case my team and I need and that's it.

# How to Use

Using ILA is super easy. Just navigate to the root of your Lambda application and run:

```shell
npx ila
```

# What ILA does

- Installs and configure Husky (default requirement is 90% test coverage)
- Installs and configures eslint/prettier with Airbnb standards
- Installs lamda-local for local development
- Configures script commands
- Removes excessive boilerplate
- A few other small things
