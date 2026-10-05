import LegalLayout from "../components/LegalLayout";

const content = {
    en: {
        title: "Privacy Policy",
        updated: "Last updated: October 5, 2026",
        backLink: "← Back to Homepage",
        intro: `BYAN ("we", "us") helps you understand Terms of Service and Privacy Policies. This policy explains what personal data we collect when you use BYAN, why we collect it, and the rights you have under Saudi Arabia's Personal Data Protection Law (PDPL).`,
        sections: [
            {
                title: "Information we collect",
                body: [
                    `Account information: when you sign in, we receive basic profile details such as your name, email address and profile picture from your sign-in provider [confirm provider and fields].`,
                    `Content you submit: the website URLs you enter for analysis.`,
                    `Analysis data: the policy text retrieved from those websites and the results we generate, such as summaries and Risk Scores [confirm whether results are stored].`,
                    `Technical data: basic information such as browser type, device and language preference, used to keep the service working [confirm any analytics tools].`
                ]
            },
            {
                title: "How we use your information",
                body: [
                    `To provide the service: locating and analyzing the policies of the websites you submit and showing you the results.`,
                    `To manage your account and keep the service secure.`,
                    `To improve BYAN's accuracy, performance and language support.`,
                    `We do not sell your personal data.`
                ]
            },
            {
                title: "Legal basis",
                body: [
                    `We process your personal data based on your consent and as needed to provide the service you request, in line with the PDPL.`
                ]
            },
            {
                title: "Sharing and third parties",
                body: [
                    `We may use service providers for hosting, authentication and language analysis [list providers, e.g. hosting, sign-in, AI/NLP services]. They only process data on our behalf and for these purposes.`,
                    `We may disclose information when required by law or by a competent authority.`
                ]
            },
            {
                title: "Data retention",
                body: [
                    `We keep personal data only as long as needed for the purposes above or as required by law [state retention period]. You can ask us to delete your data at any time.`
                ]
            },
            {
                title: "Data security",
                body: [
                    `We use reasonable technical and organizational measures to protect your data. No system is completely secure, so we cannot guarantee absolute security.`
                ]
            },
            {
                title: "Your rights",
                body: [
                    `Under the PDPL you may have the right to be informed about how your data is processed, to access your data, to request correction or deletion, and to withdraw your consent.`,
                    `To exercise these rights, contact us at the address below.`
                ]
            },
            {
                title: "Children",
                body: [`BYAN is not directed at children, and we do not knowingly collect their personal data.`]
            },
            {
                title: "Changes to this policy",
                body: [`We may update this policy from time to time. The "Last updated" date above shows the latest version.`]
            },
            {
                title: "Contact us",
                body: [`For privacy questions or requests, email [contact email].`]
            }
        ]
    },
    ar: {
        title: "سياسة الخصوصية",
        updated: "آخر تحديث: 5 أكتوبر 2026",
        backLink: "→ العودة إلى الصفحة الرئيسية",
        intro: `يساعدك "بيان" ("نحن") على فهم شروط الخدمة وسياسات الخصوصية. توضح هذه السياسة البيانات الشخصية التي نجمعها عند استخدامك بيان، ولماذا نجمعها، والحقوق المتاحة لك بموجب نظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية.`,
        sections: [
            {
                title: "المعلومات التي نجمعها",
                body: [
                    `معلومات الحساب: عند تسجيل الدخول، نستلم بيانات أساسية من مزوّد تسجيل الدخول مثل الاسم والبريد الإلكتروني وصورة الملف الشخصي [أكد المزوّد والبيانات].`,
                    `المحتوى الذي تقدمه: روابط المواقع التي تدخلها للتحليل.`,
                    `بيانات التحليل: نص السياسات المستخرج من تلك المواقع والنتائج التي ننتجها مثل الملخصات ودرجات المخاطر [أكد هل يتم حفظ النتائج].`,
                    `البيانات التقنية: معلومات أساسية مثل نوع المتصفح والجهاز وتفضيل اللغة، لضمان عمل الخدمة [أكد أي أدوات تحليلات مستخدمة].`
                ]
            },
            {
                title: "كيف نستخدم معلوماتك",
                body: [
                    `لتقديم الخدمة: العثور على سياسات المواقع التي تدخلها وتحليلها وعرض النتائج لك.`,
                    `لإدارة حسابك والحفاظ على أمان الخدمة.`,
                    `لتحسين دقة بيان وأدائه ودعمه للغات.`,
                    `نحن لا نبيع بياناتك الشخصية.`
                ]
            },
            {
                title: "الأساس النظامي",
                body: [`نعالج بياناتك الشخصية بناءً على موافقتك ولما يلزم لتقديم الخدمة التي تطلبها، وفقًا لنظام حماية البيانات الشخصية.`]
            },
            {
                title: "المشاركة والأطراف الثالثة",
                body: [
                    `قد نستعين بمزوّدي خدمات للاستضافة والمصادقة وتحليل اللغة [اذكر المزوّدين، مثل الاستضافة وتسجيل الدخول وخدمات الذكاء الاصطناعي]. ويعالجون البيانات نيابةً عنا ولهذه الأغراض فقط.`,
                    `قد نفصح عن المعلومات عندما يقتضي النظام ذلك أو تطلبه جهة مختصة.`
                ]
            },
            {
                title: "الاحتفاظ بالبيانات",
                body: [`نحتفظ بالبيانات الشخصية للمدة اللازمة للأغراض المذكورة أو وفق ما يقتضيه النظام [حدد مدة الاحتفاظ]. ويمكنك طلب حذف بياناتك في أي وقت.`]
            },
            {
                title: "أمن البيانات",
                body: [`نطبّق إجراءات تقنية وتنظيمية معقولة لحماية بياناتك. ولا يوجد نظام آمن بالكامل، لذلك لا يمكننا ضمان أمان مطلق.`]
            },
            {
                title: "حقوقك",
                body: [
                    `بموجب نظام حماية البيانات الشخصية، قد يكون لك الحق في العلم بكيفية معالجة بياناتك، والاطلاع عليها، وطلب تصحيحها أو إتلافها، وسحب موافقتك.`,
                    `لممارسة هذه الحقوق، تواصل معنا عبر البيانات أدناه.`
                ]
            },
            {
                title: "الأطفال",
                body: [`بيان غير موجّه للأطفال، ولا نجمع بياناتهم الشخصية عن علم.`]
            },
            {
                title: "التعديلات على هذه السياسة",
                body: [`قد نحدّث هذه السياسة من وقت لآخر، ويوضح تاريخ "آخر تحديث" أعلاه أحدث نسخة.`]
            },
            {
                title: "تواصل معنا",
                body: [`للاستفسارات أو الطلبات المتعلقة بالخصوصية، راسلنا على [البريد الإلكتروني].`]
            }
        ]
    }
};

export default function PrivacyPage() {
    return <LegalLayout content={content} />;
}