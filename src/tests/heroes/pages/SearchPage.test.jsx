import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../heroes/pages/SearchPage"


const mockUseNavigate = jest.fn();

jest.mock( "react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate
}) );

describe('Tests in <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('should shown correctly with default values', () => {


        const { container } = render( 
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
         );

        expect( container ).toMatchSnapshot();
        //  screen.debug();


    });


    test('should show Batman and input with queryString value', () => {


        const { container } = render( 
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchPage />
            </MemoryRouter>
         );

        const input = screen.getByRole("textbox");
        expect( input.value ).toBe("batman");

        const img = screen.getByRole("img");
        expect( img.src ).toBe( "http://localhost/assets/heroes/dc-batman.jpg" )

        //  screen.debug();
    });


    test('should keep display none after search a hero', () => {


        const { container } = render( 
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchPage />
            </MemoryRouter>
         );

        const dispNone = screen.getByLabelText("hidden");
        // console.log(dispNone.style._values.display);
        // expect( dispNone.style._values.display ).toBe( "none" );
        expect( dispNone.style.display ).toBe( "none" );
        // screen.debug();

    });


    test('should show an error if hero is not finded (batman123)', () => {

        const { container } = render( 
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <SearchPage />
            </MemoryRouter>
         );

        const dispNone = screen.getByLabelText("hidden");
        expect( dispNone.style.display ).toBe( "" );
    });


    test('should call navigate to the new screen', () => {

        const { container } = render( 
            <MemoryRouter initialEntries={["/search"]}>
                <SearchPage />
            </MemoryRouter>
         );

        const input = screen.getByRole("textbox");
        const form  = screen.getByRole("form");
         

        // fireEvent.input( input, { target: {value: "superman"} } );
        fireEvent.change( input, { target: {name: "searchText", value: "superman"} } )
        fireEvent.submit( form );

        expect( mockUseNavigate ).toHaveBeenCalledWith( "?q=superman" );

        // screen.debug();
    });


});