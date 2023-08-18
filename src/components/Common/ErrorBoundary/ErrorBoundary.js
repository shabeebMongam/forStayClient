import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
       
    }
 
  
    componentDidCatch(error, errorInfo) {
        // Handle the error here, e.g. log it to an error reporting service
        console.error(error, errorInfo);
        this.setState({ hasError: true });
    }

   

    render() {
        if (this.state.hasError) {
            // Render a fallback UI when an error occurs
            return <div className="w-screen h-screen flex justify-center items-center">  
            <h1>Something went wrong.</h1>
            

           
            </div>;
        }

       

        // Render the children normally
        return this.props.children;
    }
}

