'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

import styles from './contact-form.module.css';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: '', email: '', message: '' };

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => {
    const emailPattern = /.+@.+\..+/;
    return (
      formState.name.trim().length > 1 &&
      emailPattern.test(formState.email) &&
      formState.message.trim().length > 4
    );
  }, [formState]);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSubmitted(false);
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setFormState(initialForm);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">お名前</label>
        <input
          id="name"
          name="name"
          placeholder="山田 太郎"
          value={formState.name}
          onChange={handleChange('name')}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formState.email}
          onChange={handleChange('email')}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">お問い合わせ内容</label>
        <textarea
          id="message"
          name="message"
          placeholder="プロジェクトについて教えてください"
          rows={4}
          value={formState.message}
          onChange={handleChange('message')}
          required
        />
      </div>
      <button type="submit" disabled={!isValid}>
        送信（デモ）
      </button>
      {submitted && (
        <p role="status" className={styles.success}>
          送信ありがとうございました！担当者よりご連絡します。
        </p>
      )}
    </form>
  );
};

export default ContactForm;
