class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state={
            options : props.options
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
                <Header subtitle={subtitle}/>
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

IndecisionApp.defaultProps = {
    options : []
}

const Header = (props)=>{
    return(
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

Header.defaultProps = {
    title : "Indecision App"
}

const Action = (props)=>{
    return(
        <div>
            <button 
            onClick={props.handlePick}
            disabled={!props.hasOptions}
            >
            What should I do?
            </button>
        </div>
    );
}

const Options = (props)=>{
    return(
        <div>
            <button 
                onClick={props.handleDeleteOptions}
                disabled={!props.hasOptions}
            >
                Remove All
            </button>
            {
                props.options.map((option)=><Option key={option} optionText={option}/>)
            }
        </div>
    );
}

const Option = (props)=>{
    return(
        <div>{props.optionText}</div>
    );
}

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

ReactDOM.render(<IndecisionApp options={["one","two"]}/> ,document.getElementById("app"));