# Decoupled Drupal 8 Starter Kit

This starter kit project includes the following

- D8 Site created with the Acquia BLT framework project (http://github.com/acquia/blt)
- Leveraging a minimally customized distribution profile based on the Acquia Lightning project (https://github.com/acquia/lightning)
- Working React fully decoupled front-end app authenticating with simple_oauth
- Filesystem utilizing Amazon's S3
- GraphQL custom mutations for synchronizing Drupal's file handling wtih S3 uploads/storage
- Example of uploading to Amazon directly from the front-end and synchronizing back to Drupal

## Getting Started - DRUPAL SETUP/CONFIG

- Update the `blt/project.yml` with your local hostname and drush alias
- Run the following commands in the project root :
* $ `composer install && cd front-end && npm install`
* $ `blt setup:settings`
* Open your `sites/default/settings/local.settings.php` and edit with your development environment mysql database credentials
* Add your s3 settings to the same `local.settings.php` file: 

```
/**
 * S3fs Settings
 */
 
 
/*
|Region name               |Region id      |
|:-------------------------|:--------------|
|US East (N. Virginia)     |us-east-1      |
|US West (N. California)   |us-west-1      |
|US West (Oregon)          |us-west-2      |
|EU (Ireland)              |eu-west-1      |
|EU (Frankfurt)            |eu-central-1   |
|Asia Pacific (Tokyo)      |ap-northeast-1 |
|Asia Pacific (Seoul)      |ap-northeast-2 |
|Asia Pacific (Singapore)  |ap-southeast-1 |
|Asia Pacific (Sydney)     |ap-southeast-2 |
|South America (Sao Paulo) |sa-east-1      |
 */

$config['s3fs.settings']['access_key'] = '[YOUR ACCESS KEY]';
$config['s3fs.settings']['secret_key'] = '[YOUR SECRET KEY]';
$config['s3fs.settings']['bucket'] = '[YOUR BUCKET]'; // Your bucket name
$config['s3fs.settings']['region'] = '[YOUR REGION]; // Your region


// $config['s3fs.settings']['use_https'] = TRUE;
$settings['s3fs.use_s3_for_public'] = TRUE;
$config['s3fs.settings']['no_rewrite_cssjs'] = TRUE;

$settings['file_private_path'] = 'private-files'; // Your private directory
$settings['s3fs.use_s3_for_private'] = TRUE;

```
* Run the `blt:setup` command from your project root to install the site. Visit the site from the domain you setup. 
* Log in to the new site via drush : `drush uli`' - create a user, role, and consumer (`/admin/config/services/consumer/`)

* Ensure you have CORS configured in `docroot/sites/default/services.yml`: 

```$xslt

   # Configure Cross-Site HTTP requests (CORS).
   # Read https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
   # for more information about the topic in general.
   # Note: By default the configuration is disabled.
  cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['x-csrf-token', 'authorization', 'content-type', 'accept', 'origin', 'x-requested-with']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT', 'PATCH']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: true
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: false
```

Note: this may require updates to your apache or nginx configuration. Here's what I have set in my httpd.conf vhost file: 

```$xslt
<VirtualHost *:80>
  ServerName dev
  DocumentRoot /Users/[YOUR-USER-ACCOUNT]/Sites
  VirtualDocumentRoot /Users/[YOUR-USER-ACCOUNT]/Sites/%-2/docroot
  UseCanonicalName Off
  Header set Access-Control-Allow-Origin "*"

  <Directory "/Users/[YOUR-USER-ACCOUNT]/Sites/*/docroot">
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>

  AddType application/x-httpd-php .php
</VirtualHost>

```


## Getting Started - FRONT END SETUP/CONFIG


* create a `front-end/.env.local` file and fill in the following variables

```$xslt
REACT_APP_CLIENT_ID=[YOUR-CLIENT-ID]
REACT_APP_CLIENT_SECRET=[YOUR-CLIENT-SECRET]
REACT_APP_HOST_DOMAIN=[YOUR-HOST-DOMAIN]
```



To set up your local environment and begin developing for this project, refer to the [BLT onboarding documentation](http://blt.readthedocs.io/en/latest/readme/onboarding/). Note the following properties of this project:
* Primary development branch: develop
* Local drush alias: [YOUR DRUSH ALIAS]
* Local site URL: [YOUR SITE DOMAIN] 

## Resources


