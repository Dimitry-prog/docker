import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { faqsMock } from '@/libs/constants.ts';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Faq = () => {
  const [faqSections, setFaqSections] = useState<string[]>([]);

  const handleOpenFaq = (id: string) => {
    if (faqSections.includes(id)) {
      setFaqSections(faqSections.filter((faq) => faq !== id));
    } else {
      setFaqSections([...faqSections, id]);
    }
  };

  return (
    <section className={cx('wrapper')}>
      <h2>Часто задаваемые вопросы</h2>

      {faqsMock.map((faq) => {
        const isOpen = faqSections.find((section) => section === faq.id);

        return (
          <div onClick={() => handleOpenFaq(faq.id)} className={cx('faq', isOpen && 'arrow')}>
            <h4>{faq.question}</h4>

            <div className={cx('content', isOpen && 'open')}>
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Faq;
