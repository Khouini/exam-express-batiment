const yup = require('yup');
module.exports = async function validate(req, res, next) {
    try {
        const schema = yup.object().shape({
            name: yup.string().min(3).max(50).matches(/^[a-zA-Z\s]+$/, "Name must contains only letters").required(),
            email: yup.string().email().required(),
            cin: yup.number().required()
        });
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}