import ContactForm from '@/components/client/ContactForm';

import { contactInfo } from '@/lib/constants';

import styles from './page.module.css';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact | Next CMS Starter',
  description: 'お問い合わせ（デモ）フォームからお気軽にご相談ください。',
};

const ContactPage = () => {
  return (
    <div className={styles.layout}>
      <section className={styles.details}>
        <h1>お問い合わせ</h1>
        <p>PoC / 保守 / コンテンツ設計サポートなど幅広くご相談を承ります。</p>
        <dl>
          <dt>メール</dt>
          <dd>{contactInfo.email}</dd>
          <dt>電話</dt>
          <dd>{contactInfo.phone}</dd>
          <dt>所在地</dt>
          <dd>{contactInfo.location}</dd>
          <dt>受付時間</dt>
          <dd>{contactInfo.officeHours}</dd>
        </dl>
      </section>
      <section>
        <ContactForm />
      </section>
    </div>
  );
};

export default ContactPage;
