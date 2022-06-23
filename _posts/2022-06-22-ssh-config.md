---
title: How to configure an SSH config file on MacOS
layout: post
date:  2022-06-22 -0600
excerpt: An SSH configuration file allows the user to configure default SSH configuration values for their SSH client. This can include default server connection information, hostname aliases, identity file (key) preferences, credential storage preferences, and much more. 
tags: [programming, development, software, tools]
---

An SSH configuration file allows the user to configure default SSH configuration values for their SSH client. This can include default server connection information, hostname aliases, identity file (key) preferences, credential storage preferences, and much more. 

In this article, I will first cover the basic steps to create an SSH configuration file (or access it if one is already created). I will then demonstrate how to edit the SSH configuration file in order to simplify SSH connection commands via the terminal.

*Please note, the examples in this article are for MacOS. The steps may be similar for the Linux or Windows operating systems (more similar for Linux than Windows). However, before attempting to set up an SSH config on your system, please first consult the documentation for your specific operating system.*

## Create/edit an SSH configuration file.

### 1. Check if the hidden SSH directory is present.
First, check if the hidden SSH directory is already present on your system by running the following command: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ls -a ~

</pre>

If you see a `.ssh` directory present in the output, then that is great! Skip ahead to step #3. If the `.ssh` directory is not present in the output, then continue to step #2.

### 2. Create the hidden SSH directory.
Run the following commands to create a hidden `.ssh` directory and set the appropriate permissions for the folder:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    mkdir ~/.ssh
    chmod 700 ~/.ssh

</pre>

### 3. Check if the SSH config file is present. If not, create it.
Now, check if the SSH config file is already present by running the following command in your terminal: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ls -a ~/.ssh

</pre>

*Please note, if you had to create the `.ssh` directory in step #2, then it is expected that this directory will be empty.*

If the `config` file is not present after running the above-mentioned command, then run the following commands to create the `config` file and set the appropriate permissions:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    touch ~/.ssh/config
    chmod 700 ~/.ssh/config

</pre>

### 4. Open the SSH config file for editing.
Now that we have confirmed the SSH config file is present, we can run the following command to open the file for editing: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    nano ~/.ssh/config

</pre>

*Please note, please feel free to use a different text editor to edit the `config` file, if preferred. In the above example, I have used `nano` because it is present on almost all MacOS systems.*

### 5. Add SSH configuration properties.
With the SSH config file open, we can start adding our configuration properties. For example, we could add the following config values: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    Host linuxserver
    HostName 10.0.0.1
    User exampleuser
    IdentityFile ~/.ssh/id_rsa

</pre>

The above configuration values would allow us to connect to a server with the IP address `10.0.0.1` using the following SSH command: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ssh linuxserver

</pre>

To connect to the same server without the above-mentioned config values, it would require us to run the following command: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ssh -i "~/.ssh/id_rsa" exampleuser@10.0.0.1 

</pre>

## Additional resources.
The following resources may also be helpful to review: 
- [SSH config file for OpenSSH client](https://www.ssh.com/academy/ssh/config)
- [How to Use the chmod Command on Linux](https://www.howtogeek.com/437958/how-to-use-the-chmod-command-on-linux/)
