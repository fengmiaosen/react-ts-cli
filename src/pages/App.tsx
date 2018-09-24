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
