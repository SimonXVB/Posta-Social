import React from "react";

export class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    };

    componentDidCatch(error, info) {
        console.log(error, info);
        console.log("test")
    };

    render() {
        if(this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
};