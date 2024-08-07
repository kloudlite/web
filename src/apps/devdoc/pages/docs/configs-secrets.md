# Config & Secrets
	
In Kloudlite, configs and secrets are essential for managing application settings and sensitive information. You
can access these in your apps and workspaces, configure environment variables, and create config files mounted 
within your app or workspace containers.

## Configs:

Configs in Kloudlite are key-value pairs that store configuration data required by your applications. They allow you to manage 
application settings that are not sensitive but are essential for the app’s functionality.

These configs can be referenced within your app to control various behaviors and settings without hardcoding them into your 
application code.

## Secrets:

Secrets in Kloudlite are similar to configs but are used to store sensitive information securely. These include credentials, tokens, passwords, and other 
confidential data that should not be exposed.

These secrets are injected into your app’s environment, ensuring that sensitive data is managed securely.


**Config Creation**

![config-create](https://github.com/user-attachments/assets/111b316a-7b9f-4f9a-ad3f-8993736876d3)

**Usage**

Config in app

![config-usage-app](https://github.com/user-attachments/assets/b5956d1b-6545-4894-967d-212d9b785b02)


Config in workspace
![config-in-workspace](https://github.com/user-attachments/assets/403d0d7c-752b-4a76-9d7a-41ef4b222a54)


