import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Tabs from '@/components/shared/tabs';
import { templateTabsMock } from '@/libs/constants.ts';
import { useFilteredTemplates } from '@/features/template/hooks/use-filtered-templates.ts';
import { useAppSelector } from '@/libs/store.ts';
import { templateSelectors } from '@/features/template/slices';
import FilterTemplateForm from '@/features/template/components/filter-template-form';
import TemplateTable from '@/features/template/components/template-table';

const cx = classNames.bind(styles);

const TemplatePage = () => {
  const signal = useAppSelector(templateSelectors.getSignal);
  const { templates } = useFilteredTemplates();

  return (
    <section className={cx('wrapper')}>
      <h2>Конструктор ИПР</h2>

      <Tabs tabs={templateTabsMock} />

      <FilterTemplateForm />

      {templates && signal && (
        <div className={cx('result')}>
          <h2>Результаты поиска</h2>

          {templates.length === 0 && (
            <div className={cx('empty')}>
              <p>Ничего не найдено.</p>
              <p>Попробуйте изменить фильтры и повторить поиск.</p>
            </div>
          )}

          {templates.length > 0 && <TemplateTable templates={templates} />}
        </div>
      )}
    </section>
  );
};

export default TemplatePage;
