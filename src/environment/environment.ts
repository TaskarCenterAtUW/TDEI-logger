import dotenv from 'dotenv';
dotenv.config();
/**
 * Contains all the configurations required for setting up the core project
 * While most of the parameters are optional, appInsights connection is 
 * a required parameter since it is auto imported in the `tdei_logger.ts`
 */
export const environment = {
    appName: process.env.npm_package_name,
    eventTopics: process.env.TOPICS,
    appPort: parseInt(process.env.PORT as string) || 8080,
    authPermissionUrl: process.env.AUTH_PERMISSION_URL,
    mongoDBURL:process.env.MONGOURL,
    mongoDBName:process.env.MONGODBNAME,
    recordsCollection:process.env.MONGORECORDSCOLLECTION
}