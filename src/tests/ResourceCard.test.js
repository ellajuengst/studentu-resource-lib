import {React} from "react";
import { render, screen, cleanup } from "@testing-library/react"
import {HashRouter} from "react-router-dom";
import ResourceCard from "../components/ResourceCard"
import {AuthContext} from "../AuthContext";

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

const resource = {
    title: "title",
    desc: "desc",
    id: "id",
}

afterEach(cleanup);

test("Renders ResourceCard component", () => {
    render(<AuthContext.Provider value={value_user}><HashRouter><ResourceCard/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("resource-card");
    expect(element).toBeInTheDocument();
});

test("Renders view resource link", () => {
    render(<AuthContext.Provider value={value_user}><HashRouter><ResourceCard/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("view-link");
    expect(element).toBeInTheDocument();
});

test("Renders edit resource link for admin", () => {
    render(<AuthContext.Provider value={value_admin}><HashRouter><ResourceCard/></HashRouter></AuthContext.Provider>);
    const element = screen.getByTestId("edit-link");
    expect(element).toBeInTheDocument();
}); 

test("Does not render edit resource link for users not logged in", () => {
    render(<AuthContext.Provider value={value_user}><HashRouter><ResourceCard/></HashRouter></AuthContext.Provider>);
    const element = screen.queryByTestId("edit-link");
    expect(element).not.toBeInTheDocument();
}); 