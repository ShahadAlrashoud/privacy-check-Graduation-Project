import Link from "next/link";

export default function AboutPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #eef2f8 0%, #dbe4f0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "Segoe UI, Arial, sans-serif"
            }}
        >
            <div
                style={{
                    maxWidth: 600,
                    width: "100%",
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(30, 58, 95, 0.12)",
                    padding: "40px 32px"
                }}
            >
                <h1 style={{ margin: "0 0 16px", color: "#1e3a5f", fontSize: "1.6rem" }}>About PrivacyCheck</h1>
                <p style={{ color: "#334155", lineHeight: 1.7, fontSize: "0.95rem" }}>
                
                    PrivacyCheck is a tool that you can use on the web to make it easier to understand the rules of 
a website. You put in the website address. It automatically finds the Terms of Service or 
Privacy Policy and looks at what it says. 
It takes out the words and makes sense of them finding the parts that talk about privacy and 
keeping your data safe. Then it makes a summary that shows you the important points what 
might go wrong and what is good about it. 
It also gives a score from 0 to 100 to show how safe it is. It puts this score into three groups: 
Safe, Moderate or High Risk. 
There is also a page for the people in charge to watch what is happening and change the way 
the scores are given. 
The people who will use PrivacyCheck the most are people from Saudi and Arab countries as 
well, as people who care about digital rights, groups that teach about the law and the people 
who make sure the rules are followed

                </p>
                <Link href="/" style={{ color: "#274870", fontWeight: 500, display: "inline-block", marginTop: 20 }}>
                    ← Back to Homepage
                </Link>
            </div>
        </div>
    );
}