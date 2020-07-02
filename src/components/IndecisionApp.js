import React from "react";
import Header from "./Header";
import Options from "./Options";
import AddOption from "./AddOption";
import Action from "./Action";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
    state={
        options :[],
        selectedOption:undefined
    }
    handleDeleteOptions=()=>{
        this.setState(()=>{
            return {
                options:[]
            }
        });
    }
    handleClearSelectedOption=()=>{
        this.setState(()=>{
            return{
                selectedOption:undefined
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
        const option=this.state.options[random];
        this.setState(()=>{
            return{ 
                selectedOption : option
            }
        });
    }
    render(){
        const title="Indecision App";
        const subtitle="Put your life in the hands of a computer";
        return(
            <div> <Header 
                subtitle={subtitle}
                />
                <div className="container">
                    <Action 
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length>0}
                    />
                    <div className="widget">
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
                
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
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