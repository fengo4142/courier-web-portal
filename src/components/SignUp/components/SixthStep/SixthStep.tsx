import React, { FC, ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStores } from '../../../../store';
import SVGIcon from '../../../common/SVGIcon';
import Error from '../../../common/Error';

import styles from './SixthStep.module.sass';

interface SixthStepProps {
  handleChangeStep: any;
  handleCheckCandidate: () => {};
  err: any;
  children?: ReactNode;
}

export const SixthStep: FC<SixthStepProps> = (props) => {
  const { handleChangeStep, err, handleCheckCandidate } = props;
  const { userStore } = useStores();

  return (
    <>
      <div onClick={handleChangeStep('fifth')}>
        <SVGIcon name="backArrow" className={styles.backArrowIcon} />
      </div>
      <div className={styles.signUpForm}>
        <SVGIcon name="recipient" className={styles.bigIcon} />
        <Typography className={styles.title}>Confirm your identity</Typography>
        <Typography className={styles.subtitle}>
          I hereby authorize MZ to investigate my background and qualifications for purposes of evaluating
          whether I am qualified for the position for which I am applying. I understand that MZer will utilize an
          outside firm or firms to assist it in checking such information, and I specifically authorize such an
          investigation by information services and outside entities of the company's choice. I also understand that I
          may withhold my permission and that in such a case, no investigation will be done, and my application for
          employment will not be processed further.
        </Typography>
        <a href={userStore.get('checkrInvLink')} className={styles.checkButton} target={'_blank'}>
          <Typography>Confirm Now</Typography>
        </a>
        <Typography className={styles.checkText} onClick={handleCheckCandidate}>
          I have confirmed my identity
        </Typography>
        {err.candidate ? <Error value={err.candidate} /> : null}
      </div>
      <div className={styles.checkRFooter}>
        <Typography className={styles.checkRText}>Powered by</Typography>
        <SVGIcon name="checkr" />
      </div>
    </>
  );
};
