# vscode 配置

## 自用 setting 参考 适用于 vue 前端开发

### 时间： _2019.12.25_

#### settings.json

```
  {
  "materialTheme.autoApplyIcons": true,
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  "editor.selectionHighlight": false,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact"
    // {
    //   "language": "vue",
    //   "autoFix": true
    // }
  ],
  "vetur.format.defaultFormatter.css": "none",
  "vetur.format.defaultFormatter.js": "none",
  "vetur.format.defaultFormatter.less": "none",
  "vetur.format.defaultFormatter.scss": "none",
  "vetur.format.defaultFormatter.stylus": "none",
  "vetur.format.defaultFormatter.ts": "none",
  // "vetur.format.defaultFormatterOptions": {
  //   "js-beautify-html": {
  //     "wrap_attributes": "force-aligned"
  //     // #vue组件中html代码格式化样式
  //   }
  // },
  "vetur.validation.template": false,
  "vetur.format.defaultFormatter.postcss": "none",
  // A path to a file, or an object containing the configuration options for js-beautify. If the .jsbeautifyrc file exists in project root, it overrides this configuration.
  "beautify.config": {
    "keep_array_indentation": true,
    "end_with_newline": true,
    "preserve_newlines": true,
    "brace_style": "none,preserve-inline",
    "indent_size": 2,
    "indent_char": " ",
    "jslint_happy": false,
    "unformatted": [
      ""
    ],
    "css": {
      "indent_size": 2
    }
  },
  // List of paths to ignore when using VS Code format command, including format on save. Uses glob pattern matching.
  "beautify.ignore": [],
  // Link file types to the beautifier type
  "beautify.language": {
    "js": {
      "type": [
        "js",
        "javascript",
        "json",
        "jsonc"
      ],
      // "filename": [
      //   ".jshintrc",
      //   ".jsbeautifyrc"
      // ]
    },
    "css": [
      "css",
      "scss"
    ],
    "html": [
      "htm",
      "html",
      "vue"
      // "marko"
    ]
  },
  "workbench.colorCustomizations": {
    "activityBarBadge.background": "#00BCD4",
    "list.activeSelectionForeground": "#00BCD4",
    "list.inactiveSelectionForeground": "#00BCD4",
    "list.highlightForeground": "#00BCD4",
    "scrollbarSlider.activeBackground": "#00BCD450",
    "editorSuggestWidget.highlightForeground": "#00BCD4",
    "textLink.foreground": "#00BCD4",
    "progressBar.background": "#00BCD4",
    "pickerGroup.foreground": "#00BCD4",
    "tab.activeBorder": "#00BCD4",
    "notificationLink.foreground": "#00BCD4",
    "editorWidget.resizeBorder": "#00BCD4",
    "editorWidget.border": "#00BCD4",
    "settings.modifiedItemIndicator": "#00BCD4",
    // "settings.modifiedItemForeground": "#2979FF",
    "settings.headerForeground": "#00BCD4",
    "panelTitle.activeBorder": "#00BCD4",
    "breadcrumb.activeSelectionForeground": "#00BCD4",
    "menu.selectionForeground": "#00BCD4",
    "menubar.selectionForeground": "#00BCD4"
  },
  "files.eol": "\n",
  "breadcrumbs.enabled": true,
  "window.zoomLevel": 0,
  "materialTheme.accent": "Cyan",
  "workbench.colorTheme": "Atom One Dark",
  "explorer.confirmDelete": false,
  "workbench.editor.enablePreview": false,
  "git.enableSmartCommit": true,
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "explorer.confirmDragAndDrop": false,
  "window.openFilesInNewWindow": "on",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "workbench.startupEditor": "newUntitledFile",
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
  "workbench.iconTheme": "vscode-icons",
  "[marko]": {
    "editor.defaultFormatter": "buster.marko-beautify"
  },
  "git.confirmSync": false,
  "editor.fontWeight": "400",
  "editor.fontSize": 13,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "diffEditor.ignoreTrimWhitespace": false
}
```
