import React from "react";
import Header from "./Header";
import Options from "./Options";
import AddOption from "./AddOption";
import Action from "./Action";

class IndecisionApp extends React.Component {
    state={
        options :[]
    }
    handleDeleteOptions=()=>{
        this.setState(()=>{
            return {
                options:[]
            }
        });
    }
    handleDeleteOption=(optionToRemove)=>{
        this.setState((prevState)=>{
            return {
                options: prevState.options.filter((option)=>{
                    return option !== optionToRemove;
                })
            }
        })
    }
    handleAddOption=(option)=>{
        if(!option){
            return "Enter valid value to add item";
        }else if(this.state.options.indexOf(option)>-1){
            return "This item already exists";
        }
        this.setState((prevState)=>{
            return{
                options : prevState.options.concat(option)
            }
        });
    }
    handlePick=()=>{
        const random = Math.floor(Math.random()*this.state.options.length);
        alert(this.state.options[random]);
    }
    render(){
        const title="Indecision App";
        const subtitle="Put your life in the hands of a computer";
        return(
            <div> <Header 
                subtitle={subtitle}
                />
                <Action 
                    handlePick={this.handlePick}
                    hasOptions={this.state.options.length>0}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    hasOptions={this.state.options.length>0}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    };
    componentDidMount(){
        try{
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>{
                    return {
                        options:options
                    }
                })
            }
        }catch(e){

        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length != this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options",json);
        }
    }
    
}; 

export default IndecisionApp;