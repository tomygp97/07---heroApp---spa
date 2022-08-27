import { types } from "../../../auth/types/types"



describe('Test in types.js', () => {

    test('should return types', () => {

        expect(types).toEqual({
            
            login: "[Auth] Login",
            logout: "[Auth] Logout",

        })
    })

})