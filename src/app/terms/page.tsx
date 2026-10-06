import LegalLayout from "../components/LegalLayout";

const content = {
    en: {
        title: "Terms of Use",
        updated: "Last updated: October 5, 2026",
        backLink: "← Back to Homepage",
        intro: `These Terms govern your use of BYAN. By using the service, you agree to them. If you do not agree, please do not use BYAN.`,
        sections: [
            {
                title: "The service",
                body: [
                    `BYAN analyzes the publicly available Terms of Service and Privacy Policies of websites you submit, and provides plain-language summaries, highlighted clauses and a Risk Score from 0 to 100.`
                ]
            },
            {
                title: "Not legal advice",
                body: [
                    `BYAN is an automated tool that provides general information only. Its results, including Risk Scores and summaries, are not legal advice and do not create a lawyer-client relationship.`,
                    `Always read the original documents and consult a qualified professional before making important decisions.`
                ]
            },
            {
                title: "Accuracy and limitations",
                body: [
                    `Automated analysis can contain errors or miss clauses. Policies can change, and we may not find or correctly read every document. We do not guarantee that results are complete, accurate or current.`,
                    `A Risk Score is an estimate based on our analysis. It is not an official rating of any company or website.`
                ]
            },
            {
                title: "Accounts",
                body: [
                    `You are responsible for your account activity and for keeping your sign-in details secure. Please provide accurate information and tell us if you suspect unauthorized access.`
                ]
            },
            {
                title: "Acceptable use",
                body: [
                    `You agree not to misuse BYAN. This includes attempting to disrupt or overload the service, bypass its security, scrape or resell its results in bulk without permission, or use it for unlawful purposes.`
                ]
            },
            {
                title: "Third-party websites and content",
                body: [
                    `The policies we analyze belong to their respective owners. BYAN is not affiliated with the websites you analyze, and we are not responsible for their content or practices.`
                ]
            },
            {
                title: "Intellectual property",
                body: [
                    `BYAN's name, logo, design and software belong to us [or the project owners]. You may use the results for your personal, educational or professional reference, but you may not copy or redistribute the service itself.`
                ]
            },
            {
                title: "Limitation of liability",
                body: [
                    `To the extent permitted by law, BYAN is provided "as is" and we are not liable for any loss or damage resulting from your use of, or reliance on, the service or its results.`
                ]
            },
            {
                title: "Privacy",
                body: [`Your use of BYAN is also covered by our Privacy Policy, which explains how we handle your data.`]
            },
            {
                title: "Changes and termination",
                body: [
                    `We may update these Terms or change or suspend the service at any time. Continued use after changes means you accept the updated Terms.`
                ]
            },
            {
                title: "Governing law",
                body: [`These Terms are governed by the laws of the Kingdom of Saudi Arabia [confirm jurisdiction and dispute process].`]
            },
            {
                title: "Contact us",
                body: [`For questions about these Terms, email [contact email].`]
            }
        ]
    },
    ar: {
        title: "شروط الاستخدام",
        updated: "آخر تحديث: 5 أكتوبر 2026",
        backLink: "→ العودة إلى الصفحة الرئيسية",
        intro: `تحكم هذه الشروط استخدامك لبيان. باستخدامك للخدمة فإنك توافق عليها. وإذا كنت لا توافق، فيرجى عدم استخدام بيان.`,
        sections: [
            {
                title: "الخدمة",
                body: [
                    `يحلل بيان شروط الخدمة وسياسات الخصوصية المتاحة للعموم للمواقع التي تدخلها، ويقدّم ملخصات بلغة بسيطة وبنودًا مميزة ودرجة مخاطر من 0 إلى 100.`
                ]
            },
            {
                title: "ليس استشارة قانونية",
                body: [
                    `بيان أداة آلية تقدم معلومات عامة فقط. ولا تُعد نتائجه، بما فيها درجات المخاطر والملخصات، استشارة قانونية ولا تنشئ علاقة بين محامٍ وموكّل.`,
                    `يرجى دائمًا قراءة المستندات الأصلية واستشارة مختص مؤهل قبل اتخاذ القرارات المهمة.`
                ]
            },
            {
                title: "الدقة والقيود",
                body: [
                    `قد يحتوي التحليل الآلي على أخطاء أو يغفل بعض البنود. وقد تتغير السياسات، وقد لا نتمكن من العثور على كل مستند أو قراءته بشكل صحيح. ولا نضمن أن النتائج كاملة أو دقيقة أو محدّثة.`,
                    `درجة المخاطر تقدير مبني على تحليلنا، وليست تصنيفًا رسميًا لأي شركة أو موقع.`
                ]
            },
            {
                title: "الحسابات",
                body: [`أنت مسؤول عن نشاط حسابك وعن حماية بيانات تسجيل دخولك. يرجى تقديم معلومات صحيحة وإبلاغنا إذا اشتبهت في دخول غير مصرح به.`]
            },
            {
                title: "الاستخدام المقبول",
                body: [
                    `توافق على عدم إساءة استخدام بيان، ويشمل ذلك محاولة تعطيل الخدمة أو إثقالها، أو تجاوز إجراءاتها الأمنية، أو جمع نتائجها بكميات كبيرة أو إعادة بيعها دون إذن، أو استخدامها لأغراض غير مشروعة.`
                ]
            },
            {
                title: "المواقع والمحتوى التابع لأطراف ثالثة",
                body: [
                    `السياسات التي نحللها مملوكة لأصحابها. بيان غير تابع للمواقع التي تحللها، ولسنا مسؤولين عن محتواها أو ممارساتها.`
                ]
            },
            {
                title: "الملكية الفكرية",
                body: [
                    `اسم بيان وشعاره وتصميمه وبرمجياته مملوكة لنا [أو لأصحاب المشروع]. يمكنك استخدام النتائج للرجوع الشخصي أو التعليمي أو المهني، ولا يجوز نسخ الخدمة نفسها أو إعادة توزيعها.`
                ]
            },
            {
                title: "حدود المسؤولية",
                body: [
                    `بالقدر الذي يسمح به النظام، تُقدَّم خدمة بيان "كما هي"، ولا نتحمل المسؤولية عن أي خسارة أو ضرر ناتج عن استخدامك للخدمة أو نتائجها أو اعتمادك عليها.`
                ]
            },
            {
                title: "الخصوصية",
                body: [`يخضع استخدامك لبيان أيضًا لسياسة الخصوصية الخاصة بنا، التي توضح كيفية تعاملنا مع بياناتك.`]
            },
            {
                title: "التعديلات وإنهاء الخدمة",
                body: [`قد نحدّث هذه الشروط أو نغيّر الخدمة أو نوقفها في أي وقت. ويعني استمرارك في الاستخدام بعد التعديل قبولك للشروط المحدّثة.`]
            },
            {
                title: "النظام الواجب التطبيق",
                body: [`تخضع هذه الشروط لأنظمة المملكة العربية السعودية [أكد الاختصاص القضائي وآلية حل النزاعات].`]
            },
            {
                title: "تواصل معنا",
                body: [`للاستفسار عن هذه الشروط، راسلنا على [البريد الإلكتروني].`]
            }
        ]
    }
};

export default function TermsPage() {
    return <LegalLayout content={content} />;
}