# I18N for cubux.net web v2

![Tests status](https://github.com/cubux-net/web-v2-i18n/actions/workflows/ci.yml/badge.svg)

This repository contains i18n data for [cubux.net web version v2][web-v2].

## How to add new language

To add new language, follow steps below:

1.  Find out your language code. It's [ISO 639-1][iso-639-1] two letters code in
    lower case. For example, let it be `xy` if it would exist.
2.  Check if the language does already exist in [PRs][repo-pr].
3.  Fork this repository, then clone your fork to your local machine to edit
    files.
4.  Go to directory [`locales/`](./locales). Every subdirectory is a language.
    Copy-paste one of existing directories, and rename your copy to the language
    code from step 1. You are free to choose any of existing languages as
    origin, but obvious it's better to use the most appropriate/similar/familiar
    language if one exists. By default `en` language is more preferable as
    origin language.
5.  Edit localized strings in all of JSON files inside your language directory.
6.  Optional. Run tests as described below to check if everything is fine.
7.  Commit your changes and push. Then create a PR from your fork repository.

## Testing

If you wish or need to run tests, follow steps:

1.  Run `npm install` or `npm ci` after repository clone and after pulling from
    upstream.
2.  Run `npm test`.

[iso-639-1]: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
[repo-pr]: https://github.com/cubux-net/web-v2-i18n/pulls
[web-v2]: https://new.cubux.net
