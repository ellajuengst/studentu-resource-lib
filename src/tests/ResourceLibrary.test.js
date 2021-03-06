import {React} from "react";
import { act, render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react"
import {HashRouter} from "react-router-dom";
import ResourceLibrary from "../pages/ResourceLibrary"
import {AuthContext} from "../AuthContext";
import { auth } from "../firebase";

const value_user = {
    currentUser: null,
    signin: jest.fn(),
    signout: jest.fn(),
};

const value_admin = {
    currentUser: new Object(),
    signin: jest.fn(),
    signout: jest.fn(),
};

afterEach(cleanup);

test("Renders ResourceLibrary page", () => {
    render(<AuthContext.Provider value={value_user}><HashRouter><ResourceLibrary/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("resource-library");
    expect(element).toBeInTheDocument();
});

test("Renders admin login button for user that are not logged in", () => {
    render(<AuthContext.Provider value={value_user}><HashRouter><ResourceLibrary/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("admin-login");
    expect(element).toBeInTheDocument();
});

test("Renders logout button for admins", () => {
    render(<AuthContext.Provider value={value_admin}><HashRouter><ResourceLibrary/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("admin-mode");
    expect(element).toBeInTheDocument();
}); 

test("Renders add resource button for admins", () => {
    render(<AuthContext.Provider value={value_admin}><HashRouter><ResourceLibrary/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("add-resource-button");
    expect(element).toBeInTheDocument();
}); 

// Tests if resources container is rendered
test("Renders resource container", async () => {
    render(<AuthContext.Provider value={value_admin}><HashRouter><ResourceLibrary/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("resources");
    expect(element).toBeInTheDocument();
}); 

