import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import Dropdown from '@/components/ui/dropdown';
import Input from '@/components/ui/input';

const cx = classNames.bind(styles);

type SelectOptionType = {
  id: number;
  value: string;
};

type SelectProps = {
  options: SelectOptionType[];
  onChange?: (option: SelectOptionType | SelectOptionType[]) => void;
  multiDefaultValues?: SelectOptionType[];
  defaultValue?: string;
  isMulti?: boolean;
  isSearch?: boolean;
  disabled?: boolean;
  emptyLabel?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
};

const Select = ({
  options,
  onChange,
  multiDefaultValues,
  defaultValue = '',
  isMulti = false,
  isSearch = false,
  disabled = false,
  emptyLabel = 'Нет совпадений',
  label,
  error,
  placeholder = '',
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [tags, setTags] = useState<SelectOptionType[]>(
    isMulti && multiDefaultValues ? multiDefaultValues : []
  );
  const [filteredOption, setFilteredOption] = useState<SelectOptionType[]>(options);
  const [search, setSearch] = useState('');
  const isEmpty = filteredOption?.length === tags.length;
  const classes = cx('list', isEmpty && 'list_empty', [className]);

  const handleOptionClick = (option: SelectOptionType) => {
    if (onChange) {
      if (isMulti) {
        const updatedTags = tags.includes(option)
          ? tags.filter((tag) => tag !== option)
          : [...tags, option];
        onChange(updatedTags);
        const isExistOption = tags.find((opt) => opt.value === option.value);
        if (isExistOption) {
          setTags(tags.filter((option) => option.value !== isExistOption.value));
        } else {
          setTags((prev) => [...prev, option]);
        }
      } else {
        onChange(option);
        setIsOpen(!isOpen);
        setValue(option.value);
      }
    }
  };

  const handleToggleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleTagClick = (option: SelectOptionType) => {
    const isExistOption = tags.find((opt) => opt.value === option.value);
    if (isExistOption) {
      setTags(tags.filter((option) => option.value !== isExistOption.value));
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === '') {
      setFilteredOption(options);
    } else {
      const fundedOption = options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOption(fundedOption);
    }
  }, [search]);

  const triggerEl = (
    <div
      onClick={handleToggleOpen}
      className={cx(
        'trigger',
        isOpen && 'trigger_active',
        error && 'trigger_error',
        disabled && 'trigger_disabled'
      )}
    >
      {tags.length ? (
        <div className={cx('container')}>
          {tags.map((tag) => {
            const tagLength = tag.value.length;
            return (
              <div key={tag.id} className={cx('tag')}>
                {tagLength > 7 ? `${tag.value.slice(0, 7)}...` : tag.value}

                <button onClick={() => handleTagClick(tag)} type="button" className={cx('close')} />
              </div>
            );
          })}
        </div>
      ) : value ? (
        <p className={cx('value')}>{value}</p>
      ) : (
        placeholder
      )}
    </div>
  );

  return (
    <div className={cx('wrapper')}>
      {label && <span className={cx('label')}>{label}</span>}

      <Dropdown trigger={triggerEl} isOpen={isOpen} onClose={handleToggleOpen}>
        <>
          {isSearch && (
            <div className={cx('search')}>
              <Input
                value={search}
                onChange={handleSearch}
                icon={<img src="/icons/lupa.svg" alt="Поиск" />}
                placeholder="Поиск"
              />
            </div>
          )}

          <ul className={classes}>
            {filteredOption?.map((option) => (
              <li
                onClick={() => handleOptionClick(option)}
                key={option.id}
                className={cx(
                  'item',
                  option.value === value && 'item_active',
                  isMulti &&
                    option.value === tags.find((opt) => opt.value === option.value)?.value &&
                    'item_del'
                )}
              >
                {option.value}
              </li>
            ))}

            {isEmpty && <p className={cx('empty')}>{emptyLabel}</p>}
          </ul>
        </>
      </Dropdown>

      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
};

export default Select;
