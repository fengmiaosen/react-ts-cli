# webpack + react + typescript

探索使用webpack和React从ES2015迁移到TypeScript进行前端开发

## 配置ts

使用webpack4 + react构建的开发环境, [请点击这里](https://github.com/dzfrontend/react-cli).
迁移到TypeScript在此配置上进行.

### tsconfig.json

首先npm install typescript ts-loader --save-dev

用ts-loader解析ts文件而不是babel-loader

用tsconfig.json来覆盖默认的TypeScript编译器选项，而不是ES2015项目中的.babelrc文件

生成tsconfig.json

```sh
tsc --init
```
修改tsconfig.json
```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",                     
    "jsx": "react", /*suport react*/
    "sourceMap": true,
    "noImplicitAny": true,  
  },
  "exclude":[
    "node_modules"
  ]
}
```

### webpack.config.js

react, react-dom需要安装版本化的第三方声明文件types/react, types/react-dom

修改webpack配置
```js
// webpack.base.conf.js
const path = require('path');
module.exports = {
  entry: './src/app.client.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ],
  },
};
```

src/app.client.tsx
```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './pages/App'

ReactDOM.render(<App name ="hello" age ={20} />,document.getElementById('root'));
```

src/pages/App.tsx
```js
import * as React from 'react'
import '../styles/example.css'
interface AppPros {
  name:string;
  age:number
}
export default class App extends React.Component<AppPros,{}>{
  render(){
    return (
      <div className="exampleHome">
        {this.props.name} --- {this.props.age}
      </div>
    );
  }
}
```

webpack --config ./build/webpack.dev.conf.js，编译成功，ts环境就是这么简单，不需多余配置.