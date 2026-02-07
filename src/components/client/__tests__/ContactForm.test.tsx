import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from '@/components/client/ContactForm';

describe('ContactForm', () => {
  it('enables submit button when form is valid and displays feedback', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('お名前');
    const emailInput = screen.getByLabelText('メールアドレス');
    const messageTextarea = screen.getByLabelText('お問い合わせ内容');
    const submitButton = screen.getByRole('button', { name: '送信（デモ）' });

    expect(submitButton).toBeDisabled();

    await user.type(nameInput, '山田太郎');
    await user.type(emailInput, 'yamada@example.com');
    await user.type(messageTextarea, 'お問い合わせテストです。');

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(screen.getByRole('status')).toHaveTextContent('送信ありがとうございました');
    expect(submitButton).toBeDisabled();
  });
});
