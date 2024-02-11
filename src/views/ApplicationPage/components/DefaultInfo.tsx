import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IcEssential } from '../../@common/assets/icons';
import Button from '../../@common/components/Button';
import Header from '../../@common/components/Header';
import ProgressBar from '../../@common/components/ProgressBar';
import { INFO_MESSAGE } from '../constants/message';
import { SELECT_TYPE } from '../constants/select';

import HairTypeInput from './HairTypeInput';
import StyleButton from './StyleButton';

import { applyStepState, hairStyleState } from '@/recoil/atoms/applicationState';

const DefaultInfo = () => {
  const [step, setStep] = useRecoilState(applyStepState);
  const [selectedStyle, setSelectedStyle] = useRecoilState(hairStyleState);
  const { length, preference, verifyStatus } = selectedStyle;
  const navigate = useNavigate();

  useEffect(() => {
    length && preference.length > 0
      ? setSelectedStyle({ ...selectedStyle, verifyStatus: true })
      : setSelectedStyle({ ...selectedStyle, verifyStatus: false });
  }, [length, preference]);

  const activateCheckbox = (type: string): boolean => {
    return preference.includes(type);
  };

  return (
    <S.DefaultInfoLayout>
      <Header
        title={INFO_MESSAGE.TITLE}
        isBackBtnExist={true}
        isCloseBtnExist={false}
        closeFn={() => {
          navigate(`/`);
        }}
      />
      <ProgressBar whole={step.total} current={step.current} />
      <S.MainStyle>
        <S.StyleSection>
          <S.HairLengthSection>
            <S.Title>
              <h2>
                {INFO_MESSAGE.LENGTH_TITLE}
                <IcEssential />
              </h2>
              <span>{INFO_MESSAGE.LENGTH_SUBTITLE}</span>
            </S.Title>
            <S.HairTypeInputBox>
              <HairTypeInput imgIdx={0} type="SHORT" />
              <HairTypeInput imgIdx={1} type="ABOVE_SHOULDER" />
              <HairTypeInput imgIdx={2} type="UNDER_SHOULDER" />
              <HairTypeInput imgIdx={3} type="UNDER_WAIST" />
            </S.HairTypeInputBox>
          </S.HairLengthSection>
          <hr />
          <S.DeserveStyleSection>
            <S.Title>
              <h2>
                {INFO_MESSAGE.PREFERENCE_TITLE} <IcEssential />
              </h2>
              <span>{INFO_MESSAGE.PREFERENCE_SUBTITLE}</span>
            </S.Title>
            <S.StyleBox>
              <h3>{SELECT_TYPE.CUT}</h3>
              <StyleButton isSelected={activateCheckbox('일반 커트')} type="일반 커트" />
            </S.StyleBox>
            <hr />
            <S.StyleBox>
              <h3>{SELECT_TYPE.COLOR}</h3>
              <S.SelectList>
                <StyleButton isSelected={activateCheckbox('전체 염색')} type="전체 염색" />
                <StyleButton isSelected={activateCheckbox('전체 탈색')} type="전체 탈색" />
              </S.SelectList>
            </S.StyleBox>
            <hr />
            <S.StyleBox>
              <h3>{SELECT_TYPE.PERM}</h3>
              <S.SelectList>
                <StyleButton isSelected={activateCheckbox('셋팅펌')} type="셋팅펌" />
                <StyleButton isSelected={activateCheckbox('일반펌')} type="일반펌" />
                <StyleButton isSelected={activateCheckbox('매직')} type="매직" />
              </S.SelectList>
            </S.StyleBox>
          </S.DeserveStyleSection>
        </S.StyleSection>
      </S.MainStyle>
      <Button
        text={INFO_MESSAGE.NEXT}
        onClickFn={() => {
          setStep({ ...step, current: step.current + 1 });
        }}
        isFixed={true}
        disabled={!verifyStatus}
      />
    </S.DefaultInfoLayout>
  );
};

const S = {
  DefaultInfoLayout: styled.section`
    display: flex;
    overflow: hidden;

    width: 100%;
  `,

  MainStyle: styled.main`
    overflow-y: scroll;

    width: 100%;
    margin: 8.5rem 1rem 10rem;
    padding: 0 0.8rem 0 1rem;

    &::-webkit-scrollbar {
      width: 0;
    }
  `,

  StyleSection: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding-bottom: 2.6rem;

    & > hr {
      width: 100%;
      height: 4px;
      border: none;

      background-color: ${({ theme }) => theme.colors.moddy_gray05};
    }
  `,

  HairLengthSection: styled.section`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,

  Title: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > h2 {
      display: flex;
      justify-content: flex-start;

      color: ${({ theme }) => theme.colors.moddy_bk};

      ${({ theme }) => theme.fonts.Headline01};
    }

    & > span {
      color: ${({ theme }) => theme.colors.moddy_gray50};

      ${({ theme }) => theme.fonts.Body02};
    }
  `,

  HairTypeInputBox: styled.div`
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;

    width: 100%;
    height: 9.2rem;
    margin: 2rem 0 2.8rem;
  `,

  DeserveStyleSection: styled.section`
    display: flex;
    flex-direction: column;

    width: 100%;
    margin-top: 2.4rem;

    & > p {
      display: flex;
      justify-content: flex-start;
    }

    & > hr {
      width: 100%;
      height: 1px;
      border: none;

      background-color: ${({ theme }) => theme.colors.moddy_gray05};
    }
  `,

  StyleBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    margin: 1.6rem 0;

    & > h3 {
      color: ${({ theme }) => theme.colors.moddy_bk};

      ${({ theme }) => theme.fonts.Body01};
    }
  `,

  SelectList: styled.ul`
    display: flex;
    flex-wrap: wrap;
    row-gap: 1.2rem;
  `,
};

export default DefaultInfo;