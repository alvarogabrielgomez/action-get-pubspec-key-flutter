# GitHub Action — Get the Content of a Key from pubspec.yaml in a Flutter App

This GitHub Action (written in composite run steps) allows you to leverage GitHub Actions to get the [Flutter](https://flutter.dev) pubspec file and get content of a root key.

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#common-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
For more information on this input, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith)

* `pubspec-file-path`: The pubspec.yaml file path. Optional. Default: `pubspec.yaml`
* `key`: The key to look at. Optional. Default: `version`

### Outputs
For more information on this output, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idoutputs) and the [Context and expression syntax for GitHub Actions](https://docs.github.com/actions/reference/context-and-expression-syntax-for-github-actions#steps-context)

* `key`: The content and the key that you search, this name depends of the key you search

### Common workflow

Example if you search the key 'version':

```yaml
on: push

name: Sample Workflow

jobs:
  build:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Get App version
        id: app-version
        uses: alvarogabrielgomez/github-actions-get-content-pubspec-flutter@v1
      - run: echo "The content of the 'version' key is ${{ steps.app-version.outputs.version }}."

```

## Shout-out
A special mention goes to [@zgosalvez](https://github.com/zgosalvez), who create the initial solution of search a key at [github-actions-get-flutter-version-env](https://github.com/zgosalvez/github-actions-get-flutter-version-env). I only extend the idea to search another keys.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)