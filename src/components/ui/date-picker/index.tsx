import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { Calendar } from '@alfalab/core-components-calendar';
import Dropdown from '@/components/ui/dropdown';
import { formattedDate } from '@/libs/utils.ts';

const cx = classNames.bind(styles);

type DatePickerProps = {
  value: number;
  onChange: (...event: unknown[]) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
};

const DatePicker = ({
  disabled = false,
  label,
  value,
  onChange,
  error,
  placeholder = '',
  className,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const classes = cx('calendar', [className]);

  const handleOptionClick = () => {
    setIsOpen(false);
    if (value) {
      setDate(formattedDate(value as number));
    }
  };

  const handleToggleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    handleOptionClick();
  }, [value]);

  const triggerEl = (
    <button
      onClick={handleToggleOpen}
      type="button"
      className={cx(
        'trigger',
        isOpen && 'trigger_active',
        error && 'trigger_error',
        disabled && 'trigger_disabled'
      )}
    >
      {date ? <p className={cx('value')}>{date}</p> : placeholder}
    </button>
  );

  return (
    <div className={cx('wrapper')}>
      {label && <span className={cx('label')}>{label}</span>}

      <Dropdown trigger={triggerEl} isOpen={isOpen} onClose={handleToggleOpen}>
        <Calendar
          value={value as number}
          open={isOpen}
          responsive
          onChange={onChange}
          className={classes}
        />
      </Dropdown>

      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
};

export default DatePicker;
