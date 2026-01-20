import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../App';
import { STR } from '../utils/languageData';

export default function Home() {
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);
  const t = STR[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {lang === 'hi' ? 'शिक्षा, समुदाय, भविष्य' : lang === 'pa' ? 'ਸਿੱਖਿਆ, ਭਾਈਚਾਰਾ, ਭਵਿੱਖ' : 'Education, Community, Future'}
              <br />
              <span className="text-blue-600">{t.appTitle}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {lang === 'hi'
                ? 'ग्रामीण छात्रों को गुणवत्तापूर्ण शिक्षा से जोड़ना। किसी भी समय, कहीं भी, इंटरनेट के साथ या बिना सीखें।'
                : lang === 'pa'
                  ? 'ਪਿੰਡਾਂ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਗੁਣਵੱਤਾ ਸਿੱਖਿਆ ਨਾਲ ਜੋੜਨਾ। ਕਿਸੇ ਵੀ ਸਮੇਂ, ਕਿਤੇ ਵੀ, ਇੰਟਰਨੈਟ ਦੇ ਨਾਲ ਜਾਂ ਬਿਨਾਂ ਸਿੱਖੋ।'
                  : 'Connecting rural students with quality education. Learn anytime, anywhere, with or without internet.'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-lg transform hover:scale-105 transition"
              >
                {lang === 'hi' ? '📚 सीखना शुरू करें' : lang === 'pa' ? '📚 ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ' : '📚 Start Learning'}
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 border-2 border-blue-600 transition"
              >
                {lang === 'hi' ? 'और जानें' : lang === 'pa' ? 'ਹੋਰ ਜਾਣੋ' : 'Learn More'}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/hero.png"
              alt="Rural Education"
              className="rounded-3xl shadow-2xl w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-xl my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          {lang === 'hi' ? 'प्लेटफ़ॉर्म विशेषताएं' : lang === 'pa' ? 'ਪਲੇਟਫਾਰਮ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ' : 'Platform Features'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition">
            <div className="w-32 h-32 mx-auto mb-4">
              <img src="/icon-study.png" alt="Study Materials" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {lang === 'hi' ? 'समृद्ध अध्ययन सामग्री' : lang === 'pa' ? 'ਅਮੀਰ ਅਧਿਐਨ ਸਮੱਗਰੀ' : 'Rich Study Materials'}
            </h3>
            <p className="text-gray-600">
              {lang === 'hi'
                ? 'PDFs, वीडियो, चित्र और ऑडियो पाठों तक पहुंचें। ऑफ़लाइन अध्ययन के लिए डाउनलोड करें।'
                : lang === 'pa'
                  ? 'PDFs, ਵੀਡੀਓਜ਼, ਤਸਵੀਰਾਂ ਅਤੇ ਆਡੀਓ ਪਾਠਾਂ ਤੱਕ ਪਹੁੰਚ ਕਰੋ। ਆਫਲਾਈਨ ਅਧਿਐਨ ਲਈ ਡਾਊਨਲੋਡ ਕਰੋ।'
                  : 'Access PDFs, videos, images, and audio lessons. Download for offline study.'}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 rounded-xl hover:bg-purple-50 transition">
            <div className="w-32 h-32 mx-auto mb-4">
              <img src="/icon-assignment.png" alt="Assignments" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {lang === 'hi' ? 'इंटरैक्टिव असाइनमेंट' : lang === 'pa' ? 'ਇੰਟਰਐਕਟਿਵ ਅਸਾਈਨਮੈਂਟਸ' : 'Interactive Assignments'}
            </h3>
            <p className="text-gray-600">
              {lang === 'hi'
                ? 'ऑनलाइन होमवर्क जमा करें, तुरंत फीडबैक प्राप्त करें, अपनी प्रगति ट्रैक करें।'
                : lang === 'pa'
                  ? 'ਆਨਲਾਈਨ ਹੋਮਵਰਕ ਜਮ੍ਹਾਂ ਕਰੋ, ਤੁਰੰਤ ਫੀਡਬੈਕ ਪ੍ਰਾਪਤ ਕਰੋ, ਆਪਣੀ ਤਰੱਕੀ ਟਰੈਕ ਕਰੋ।'
                  : 'Submit homework online, get instant feedback, track your progress.'}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 rounded-xl hover:bg-green-50 transition">
            <div className="w-32 h-32 mx-auto mb-4">
              <img src="/icon-attendance.png" alt="Attendance" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {lang === 'hi' ? 'प्रगति ट्रैक करें' : lang === 'pa' ? 'ਤਰੱਕੀ ਟਰੈਕ ਕਰੋ' : 'Track Progress'}
            </h3>
            <p className="text-gray-600">
              {lang === 'hi'
                ? 'उपस्थिति की निगरानी करें, ग्रेड देखें, और अपनी सीखने की यात्रा देखें।'
                : lang === 'pa'
                  ? 'ਹਾਜ਼ਰੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ, ਗ੍ਰੇਡ ਦੇਖੋ, ਅਤੇ ਆਪਣੀ ਸਿੱਖਣ ਦੀ ਯਾਤਰਾ ਦੇਖੋ।'
                  : 'Monitor attendance, view grades, and see your learning journey.'}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {lang === 'hi'
              ? 'अपनी सीखने की यात्रा शुरू करने के लिए तैयार हैं?'
              : lang === 'pa'
                ? 'ਆਪਣੀ ਸਿੱਖਣ ਦੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?'
                : 'Ready to Start Your Learning Journey?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {lang === 'hi'
              ? 'GyaanSetu के साथ सीखने वाले हजारों छात्रों से जुड़ें'
              : lang === 'pa'
                ? 'GyaanSetu ਨਾਲ ਸਿੱਖਣ ਵਾਲੇ ਹਜ਼ਾਰਾਂ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ ਜੁੜੋ'
                : 'Join thousands of students learning with GyaanSetu'}
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-10 py-4 bg-white text-blue-600 text-xl font-bold rounded-lg hover:bg-gray-100 shadow-lg transform hover:scale-105 transition"
          >
            {lang === 'hi' ? '🎓 अभी साइन अप करें - यह मुफ़्त है!' : lang === 'pa' ? '🎓 ਹੁਣੇ ਸਾਈਨ ਅੱਪ ਕਰੋ - ਇਹ ਮੁਫਤ ਹੈ!' : '🎓 Sign Up Now - It\'s Free!'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            <span className="font-bold text-blue-400">{t.appTitle}</span> - {lang === 'hi' ? 'भारत के ग्रामीण क्षेत्रों में शिक्षा की खाई को पाटना' : lang === 'pa' ? 'ਭਾਰਤ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਸਿੱਖਿਆ ਦੀ ਖਾਈ ਨੂੰ ਪੂਰਾ ਕਰਨਾ' : 'Bridging the Education Gap in Rural India'}
          </p>
          <p className="text-gray-400 mt-2">
            © 2026 GyaanSetu. {lang === 'hi' ? 'सभी के लिए शिक्षा को सशक्त बनाना।' : lang === 'pa' ? 'ਸਭ ਲਈ ਸਿੱਖਿਆ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ।' : 'Empowering Education for All.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
