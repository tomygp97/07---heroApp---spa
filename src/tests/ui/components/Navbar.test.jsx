import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { Navbar } from "../../../ui"


const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate
}));

describe('Tests in <Navbar />', () => {

    const contextValue = {
        logged: true,
        user:{
            id: "ABC",
            name: "Pene",
        },
            logout: jest.fn()
    } 

    beforeEach( () => jest.clearAllMocks() );

    test('should show user name if is authenticated', () => {

       

        render( 

            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        
        );

        // screen.debug();
        expect( screen.getByText("Pene") ).toBeTruthy();


    });


    test('should call logout and navigate on click', () => {

       

        render( 

            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        
            );

        const logoutButton = screen.getByRole( "button" );
        fireEvent.click(logoutButton);
        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});

        
    });


})