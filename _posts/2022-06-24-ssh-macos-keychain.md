---
title: How to configure SSH to store private key passphrases in the MacOS Keychain
layout: post
date:  2022-06-23 -0600
excerpt: In order to better secure SSH private keys, it is considered good practice to set a passphrase on the private key. However, it can prove cumbersome to enter this passphrase every time the SSH private key is used. When using MacOS, it is possible to configure SSH to store and load your private key passphrases in the MacOS Keychain. This would only require the user to input the private key's passphrase once. After that, the SSH private key and it's passphrase will be automatically loaded each time the user reboots or logs in to their system. 
tags: [programming, development, software, tools]
---

In order to better secure SSH private keys, it is considered good practice to set a passphrase on the private key. However, it can prove cumbersome to enter this passphrase every time the SSH private key is used. For example, when using SSH to authenticate with a git server, such as GitHub, the user will be prompted to enter their passphrase in the terminal for every git operation (pull, push, etc.). 

When using MacOS, it is possible to configure SSH to store and load your private key passphrases in the MacOS Keychain. This would only require the user to input the private key's passphrase once. After that, the SSH private key and it's passphrase will be automatically loaded each time the user reboots or logs in to their system. 

I have included steps to accomplish this below. 

## Configure SSH to store private key passphrases in the MacOS Keychain.

### 1. Open SSH config file for editing.
First, open the SSH config file for editing by using the following command, or the text editor of your choice. 

*Please note, if you do not yet have an SSH config file created, then I recommend reviewing the following article first: [How to configure an SSH config file on MacOS](https://erickmccollum.com/2022/06/22/ssh-config.html).*

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    nano ~/.ssh/config

</pre>

### 2. Add MacOS Keychain configuration properties to the SSH config file.
With the SSH config file open, please add the following lines at the top of your terminal. Save and close the config file afterward. 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    AddKeysToAgent yes
    UseKeychain yes

</pre>

The above two lines will do the following: 
- `AddKeysToAgent`: Instruct SSH to automatically load all private keys into the `ssh-agent` identity cache. 
- `UseKeychain`: Instruct SSH try and load private key passphrases from the MacOS Keychain, if they are present. This will also configure SSH to store private key passphrases in the MacOS Keychain once they are verified to be correct.

### 3. Add private key passphrase to the MacOS Keychain. 
Once the above lines have been added, you can add any private key passphrases to the MacOS Keychain using the following command. 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ssh-add --apple-use-keychain ~/.ssh/<path_to_key>

</pre>

*Please replace `<path_to_key>` in the above command with the actual path to your private key file. 

After entering the above command, you should be prompted to enter the private key passphrase. However, this should only need to be done once. 

After the above steps have been completed, you should now be able to authenticate via SSH without needing to enter you private key passphrase for every connection attempt. 

## Additional resources.
- [Passphrase - What it is, how to use](https://www.ssh.com/academy/ssh/passphrase)
