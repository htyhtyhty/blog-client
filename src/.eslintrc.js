module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended', // 使用 React 推荐的规则
    'plugin:jsx-a11y/recommended', // 准备无障碍的推荐规则
     // 关闭eslint配置中与prettier冲突的格式化规则
     "prettier",
     "prettier/react",
     "prettier/@typescript-eslint",
],
globals: {
  Atomics: "readonly",
  SharedArrayBuffer: "readonly",
},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "prettier",
    "import",
    "@typescript-eslint",
    "react-hooks"
  ],
  /**
   * eslint-react规则
   * 注释中以‘CUSTOM’结尾的规则为可自定义规则（具体项目可自行调整）
   * 其余注释各业务方请不要随意配置，以规范为准
   * 以@typescript-eslint开头的规则由@typescript-eslint插件提供，用于检测ts
   *
   */
  rules: {
    // 这里可以定义 HTML 标签格式化的规则
    'prettier/prettier': 'error', // 确保 Prettier 的规则被应用
    'react/jsx-indent': ['error', 2], // 设置 JSX 标签的缩进为 2 个空格
    'react/jsx-indent-props': ['error', 2], // 设置 JSX 属性的缩进为 2 个空格
    '@typescript-eslint/type-annotation-spacing': ['error', {
      'before': false, // 冒号前面不能有空格
      'after': false, // 冒号后面不能有空格
    }],
    'semi': ['error', 'never'], // 不允许语句以分号结束
    // ============命名=============
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      1,
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'allow',
      }, // 强制使用驼峰、帕斯卡、常量大写命名  --CUSTOM
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      }, // class和interface采用帕斯卡命名(不允许下划线)
    ],

    // ============空格 && 缩进=============
    'eol-last': [1, 'always'], // 要求或禁止文件末尾存在空行
    'func-call-spacing': [2, 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'template-tag-spacing': [2, 'always'], // 要求或禁止在模板标记和它们的字面量之间有空格
    'spaced-comment': [
      // 要求或禁止在注释前有空白
      2,
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'space-infix-ops': 2, // 要求中缀操作符周围有空格
    'comma-spacing': [2, { after: true }], // 强制在逗号前后使用一致的空格
    'no-trailing-spaces': 2, // 禁用行尾空格
    'space-before-function-paren': [
      // 要求或禁止函数圆括号之前有一个空格
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-multi-spaces': 2, // 禁止使用多个空格
    'object-curly-spacing': [2, 'always'], // 对象大括号旁必须有空格
    // '@typescript-eslint/type-annotation-spacing': 0, // 声明类型时必须无空格，与prettier冲突，关闭  --CUSTOM
    'no-unexpected-multiline': 2, // 禁止不期待的多行写法
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }], // 过长需换行时操作符的位置  --CUSTOM

    // ============符号相关=============
    'comma-style': [2, 'last'], // 逗号规则
    'comma-dangle': [
      // 行末尾必须有逗号
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
      },
    ],
    quotes: [2, 'single'], // 字符串必须使用单引号
    eqeqeq: [2, 'smart'], // 强制使用三等，除了对比null/undefined  --CUSTOM
    'no-extra-parens': 0, // 禁止不必要的括号 (as any写法会被误判)

    // ============箭头函数相关=============
    'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
    'arrow-spacing': [2, { before: true, after: true }],
    'arrow-body-style': [2, 'as-needed'], // 要求箭头函数体使用大括号

    // ============其他=============
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'one-var-declaration-per-line': 2, // 禁止一次性定义多个变量
    'key-spacing': [2, { afterColon: true }], // object的key的“:”之后至少有一个空格
    'no-inner-declarations': 1, // 禁止在嵌套的块中出现变量声明或 function 声明  --CUSTOM
    'require-atomic-updates': 1, // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值  --CUSTOM
    'no-case-declarations': 1, // 不允许在 case 子句中使用词法声明  --CUSTOM
    'prefer-rest-params': 0, // 要求使用剩余参数而不是 arguments  --CUSTOM
    'prefer-template': 1, // 要求使用模板字面量而非字符串连接  --CUSTOM
    'no-undef': 0, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到 （原因：全局变量较常用，定义在global.d.ts中即可）
    'no-constant-condition': 0, // 禁止在条件中使用常量表达式
    'prefer-spread': 0, // 要求使用扩展运算符而非 .apply()
    'no-useless-escape': 0, // 禁用不必要的转义字符 (意义不大)
    'dot-notation': 0, // object操作要求使用点号 (意义不大)
    'no-unused-vars': 0, // 禁止出现未使用过的变量（与typescript规则重复）
    '@typescript-eslint/consistent-type-assertions': 1, // 强制规范类型定义的方式  --CUSTOM
    '@typescript-eslint/explicit-function-return-type': 0, // 对返回类型不明确的函数必须声明类型
    '@typescript-eslint/no-var-requires': 0, // 禁止var foo = require("foo"）用import代替
    '@typescript-eslint/no-non-null-assertion': 0, // 禁止使用!的非null断言后缀运算符
    '@typescript-eslint/no-use-before-define': 0, // 在定义变量和函数之前禁止使用
    '@typescript-eslint/no-explicit-any': 0, // 禁止使用any类型
    '@typescript-eslint/no-unnecessary-type-assertion': 0, // 禁止使用尖括号范型
    '@typescript-eslint/no-inferrable-types': 0, // 不允许对初始化为数字，字符串或布尔值的变量或参数进行显式类型声明
    '@typescript-eslint/no-this-alias': 1, // 禁止对this使用别名  --CUSTOM
    '@typescript-eslint/no-namespace': 1, // 禁止使用自定义TypeScript模块和名称空间  --CUSTOM
    '@typescript-eslint/no-unused-vars': [1, { vars: 'all', args: 'none', ignoreRestSiblings: true }], // 提示未使用的变量  --CUSTOM

    // ============import插件=============
    'import/named': 0, // 允许使用import { XType } from X 导出类型
    'import/no-unresolved': 0, // 使用alias，关闭
    'import/order': 1, // import引入按照一定顺序

    // ============promise插件=============
    'promise/always-return': 0, // promise.then必须return
    'promise/catch-or-return': 0, // promise必须使用catch
    'promise/no-callback-in-promise': 0, // promise.then中禁止使用回调函数
    'promise/no-return-wrap': 0, // 避免在不需要时将值包在Promise.resolve或Promise.reject中  --CUSTOM

    // ============React规则=============
    'react/default-props-match-prop-types': 1, // 有默认值的属性必须在propTypes中指定  --CUSTOM
    'react/no-array-index-key': 1, // 不要使用数组索引作为key，尽可能使用ID
    'react/no-multi-comp': 1, // 一个文件只能存在一个组件 --CUSTOM
    'react/no-unused-prop-types': 1, // 禁止未使用的prop参数
    'react/prefer-es6-class': 1, // 强制使用es6 extend方法创建组件
    // 'react/require-default-props': 0, // 非require的propTypes必须制定默认值【Hooks写法无效，不建议使用】  --CUSTOM
    'react/self-closing-comp': 1, // 没有children的组件和html必须使用自闭和标签
    'react/sort-comp': 1, // 对组件的方法排序
    'react/sort-prop-types': 1, // 对prop排序
    'react/style-prop-object': 1, // 组件参数如果是style，value必须是object
    'react/jsx-boolean-value': 1, // 属性值为true的时候，省略值只写属性名
    'react/jsx-closing-tag-location': 1, // 强制开始标签闭合标签位置
    'react/jsx-closing-bracket-location': 1, // 强制结束标签闭合标签位置
    'react/jsx-equals-spacing': 1, // 属性赋值不允许有空格
    'react/jsx-key': 2, // 强制遍历出来的jsx加key
    'react/jsx-no-comment-textnodes': 1, // 检查jsx注释
    'react/jsx-pascal-case': 1, // 检查jsx标签名规范
    'react/jsx-wrap-multilines': [
      1,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react-hooks/rules-of-hooks': 2, // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 1, // 检查 Effect 的依赖（autofix时会自动添加依赖，不安全，故关掉） --CUSTOM
  },
  settings: {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "detect",
    },
  },
  // 为.js文件设置覆盖规则
  overrides: [
    {
      files: ['./**/*.js'],
      excludedFiles: '*.spec.js',
      rules: {
        'no-var': 0,
      },
    },
  ],
}
