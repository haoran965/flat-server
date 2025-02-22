import { dataSource } from "../../../../thirdPartyService/TypeORMService";
import { CloudStorageConfigsModel } from "../../../../model/cloudStorage/CloudStorageConfigs";
import { v4 } from "uuid";

export class CreateCloudStorageConfigs {
    public static async full(info: { userUUID: string; totalUsage: number }) {
        await dataSource
            .createQueryBuilder()
            .insert()
            .into(CloudStorageConfigsModel)
            .values({
                user_uuid: info.userUUID,
                total_usage: String(info.totalUsage),
            })
            .orIgnore(true)
            .execute();
    }

    public static async quick() {
        const info = {
            userUUID: v4(),
            totalUsage: Math.ceil(Math.random() * 100000),
        };

        await CreateCloudStorageConfigs.full(info);

        return info;
    }

    public static async fixedTotalUsage(totalUsage: number) {
        const info = {
            userUUID: v4(),
            totalUsage,
        };

        await CreateCloudStorageConfigs.full(info);

        return info;
    }

    public static async fixedUserUUID(userUUID: string) {
        const info = {
            userUUID,
            totalUsage: Math.ceil(Math.random() * 100000),
        };

        await CreateCloudStorageConfigs.full(info);

        return info;
    }
}
