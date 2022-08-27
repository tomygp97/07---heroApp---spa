import { authReducer } from "../../../auth/context/authReducer";


describe('Test in authReducer', () => {
   
    const initialState = {
        // logged: false,
        // user: "Tomas",
    }

    const types = {
        login: "[Auth] Login",
        logout: "[Auth] Logout",
    }
    

    test('should return default state', () => {

        const newState = authReducer( initialState, {} );

        expect( newState ).toEqual( initialState );
    });


    test('login should add user', () => {

        const action = {
            type: types.login,
            payload: "Juan",
        }

        // const action = {
        //     type: "[Auth] Login",
        //     payload: {
        //         logged: true,
        //         user: "Juan",
        //     }
        // }

        const newState = authReducer( initialState, action );
        expect( newState.logged ).toBeTruthy();
        expect( newState.user ).toBe( "Juan" );
        // console.log( newState );
        // console.log( newState.user );
        // console.log( newState.logged );

    });


    test('should delete username and set logged in false', () => {

        const action1 = {
            type: types.login,
            payload: "Juan",
        }
        const action2 = {
            type: types.logout,
        }

        const newStateLogin = authReducer( initialState, action1 );
        const newStateLogout = authReducer( newStateLogin, action2 );

        // console.log( initialState );
        // console.log( newStateLogin );
        // console.log( newStateLogout );

        expect( newStateLogout ).not.toContain( "Juan" );
        expect( newStateLogout.logged ).toBeFalsy();


    });


});