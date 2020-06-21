class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state={
            options : []
        }
    }
    handleDeleteOptions(){
        this.setState(()=>{
            return {
                options:[]
            }
        });
    }
    handleAddOption(option){
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
    handlePick(){
        const random = Math.floor(Math.random()*this.state.options.length);
        alert(this.state.options[random]);
    }
    render(){
        const title="Indecision App";
        const subtitle="Put your life in the hands of a computer";
        return(
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action 
                    handlePick={this.handlePick}
                    hasOptions={this.state.options.length>0}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    hasOptions={this.state.options.length>0}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
} 

class Header extends React.Component {
    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    };
};

class Action extends React.Component {
    render(){
        return(
            <div>
                <button 
                onClick={this.props.handlePick}
                disabled={!this.props.hasOptions}
                >
                What should I do?
                </button>
            </div>
        );
    };
};

class Options extends React.Component {
    render(){
        return(
            <div>
                <button 
                    onClick={this.props.handleDeleteOptions}
                    disabled={!this.props.hasOptions}
                >
                    Remove All
                </button>
                {
                    this.props.options.map((option)=><Option key={option} optionText={option}/>)
                }
            </div>
        );
    };
};

class Option extends React.Component {
    render(){
        return(
            <div>{this.props.optionText}</div>
        );
    };
};

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error:undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        e.target.elements.option.value="";
        this.setState(()=>{
            return {
                error:error
            }
        });
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    };
};

ReactDOM.render(<IndecisionApp /> ,document.getElementById("app"));