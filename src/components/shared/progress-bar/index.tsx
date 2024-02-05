import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type ProgressBarProps = {
  step: number;
  totalSteps: number;
  className?: string;
};

const ProgressBar = ({ step, totalSteps, className }: ProgressBarProps) => {
  const percent = Math.ceil((step / totalSteps) * 100);
  const classes = cx('wrapper', [className]);

  return (
    <div className={classes}>
      <div>
        <span style={{ width: `${percent}%` }} />
      </div>

      <p>
        {step}/{totalSteps}
      </p>
    </div>
  );
};

export default ProgressBar;
