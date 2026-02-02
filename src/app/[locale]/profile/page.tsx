import {useTranslations} from "next-intl";
import {FaEdit} from "react-icons/fa";

export default function Profile(){
    const t = useTranslations("Profile")
    return (
        <div className="p-4">
            <div className="bg-white rounded-xl shadow flex flex-col">
                <div
                    className="flex items-center justify-between mb-4 bg-[#065F46] rounded-tr-xl rounded-tl-xl px-4 py-3">
                    <h3 className="text-lg font-semibold text-white">{t('settings')}</h3>
                    <div className="bg-white rounded-full p-2">
                        <FaEdit />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4 px-4">
                    <div className="flex flex-col items-start space-y-4">
                        <div className="w-56">
                            <div className="text-green-600">{t('first-name')}</div>
                            <div>Admin</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('last-name')}</div>
                            <div>Adminov</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('surname')}</div>
                            <div>Adminovich</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('office')}</div>
                            <div>Office</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('job-title')}</div>
                            <div>Job Title</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('phone-number')}</div>
                            <div>+99365656565</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('corporate-number')}</div>
                            <div>+99371717171</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start space-y-4">
                        <div className="w-56">
                            <div className="text-green-600">{t('email')}</div>
                            <div>email@com</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('corporate-email')}</div>
                            <div>email@com</div>
                        </div>
                        <div className="w-56">
                            <div className="text-green-600">{t('birthday')}</div>
                            <div>01.01.1970</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}