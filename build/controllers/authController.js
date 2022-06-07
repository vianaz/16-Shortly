class AuthController {
    static signIn(req, res) {
        res.send('sign-in');
    }
    static signUp(req, res) {
        console.log('sign-up');
    }
}
export default AuthController;
