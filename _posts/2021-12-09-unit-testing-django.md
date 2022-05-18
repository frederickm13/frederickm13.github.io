---
title: Unit testing in Django
layout: post
date:  2021-12-09 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/Django/unit-testing-django
excerpt: How to run unit tests for a Django application.
tags: [development, python, software, programming, example, unit, test, unit test, unit testing, testing, django]
---

After creating a Django project and application, a default `tests` directory is created within the Django application directory. At this point, the following command can be run in order to execute all unit tests within a Django project:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ./manage.py test

</pre>

The above command will run all unit tests in any files that match the `test*.py` pattern. For example, a file named `tests.py` will match this pattern, but a file named `validations.py` will not. It is important to note that unit test files do not need to be contained within the `tests/` directory. However, it is generally accepted as good practice.

## Run only the unit tests in a specific sub-folder.
Some additional command line parameters can be passed to the `manage.py test` command in order to run specific unit tests, rather than running all of them. For example, it is possible to run only the unit tests within a specific sub-directory.

In order to only run the unit tests located in the `tests/sub-tests` sub-directory, the sub-directory needs to be configured as a Python package. This means that both the `tests` directory and the `tests/sub-tests` sub-directory need to have an `__init__.py` file created within them.

Once the sub-directory has been configured as a Python package, the following command can be used to run only the unit tests that are located in that package:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ./manage.py test {app_name}.tests.sub-tests

</pre>

It is also possible to simply pass a folder name to the `manage.py test` command, rather than configuring a folder as a package. For example:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    ./manage.py test {app_name}/tests/sub-tests

</pre>

## Sample code.
I have created a sample Django application that demonstrates some of the different ways to run unit tests for a Django project. The source code for this sample application can be found on my GitHub profile at the following link: [code-samples/Django/unit-testing-django](https://github.com/frederickm13/code-samples/blob/master/Django/unit-testing-django/README.md).

## More Information
Django unit testing documentation: [Writing and running tests](https://docs.djangoproject.com/en/3.2/topics/testing/overview/)
