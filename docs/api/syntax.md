# Syntax

<!-- feature
compatibility: "*"
-->

## Feature manifest `<!-- feature ... -->` tag

This tag describe the next section on a document content a feature. This tag content a yaml object.

```md
<!-- feature
compatibility: ">=v1.0.0 || v0.1.0-beta"
-->

## My feature
```

<!-- feature
compatibility: "*"
-->

## compatibility options

Describe the semantic version matching to look the compatibility with the list of versions.

```md
<!-- feature
compatibility: ">=v1.0.0 || v0.1.0-beta"
-->
```
