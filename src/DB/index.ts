import colors from 'colors';
import { User } from '../app/modules/user/user.model';
import config from '../config';
import { USER_ROLES } from '../enums/user';
import { logger } from '../shared/logger';
const superUser = {
    firstName: 'Super',
    lastName: 'Admin',
    role: USER_ROLES.ADMIN,
    email: config.admin.email,
    password: config.admin.password,
    verified: true,
};

const seedSuperAdmin = async () => {
    const isExistSuperAdmin = await User.findOne({
        role: USER_ROLES.ADMIN,
    });

    if (!isExistSuperAdmin) {
        await User.create(superUser);
        logger.info(colors.green('✔ Super admin created successfully!'));
    } else {
        
    }

};

export default seedSuperAdmin;