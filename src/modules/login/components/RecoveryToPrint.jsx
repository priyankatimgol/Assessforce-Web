import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const RecoveryToPrint = React.forwardRef((props, ref) => {
  const { recoveryCodes } = props;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        h1 {
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
          text-align: center;
        }
        p {
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1.875rem;
        }
        .pre {
          font-size: 1.125rem;
          line-height: 1.8;
          white-space: pre-wrap;
          margin-bottom: 1.875rem;
          text-align: center;
        }
        .footer {
          font-size: 0.75rem;
          text-align: center;
          padding-top: 0.625rem;
          margin-top: 1.875rem;
        }
        .footer .copyrights {
          text-align: left;
        }
        body {
          margin: 0;
          padding: 2.5rem;
        }
        h1, p, pre {
          page-break-inside: avoid;
        }
        @page {
          margin: 0;
        }
        .footer {
          position: fixed;
          bottom: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div ref={ref}>
      <p style={{ textAlign: 'left', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
        {new Date().toLocaleString()}
      </p>
      <h1>Recovery Codes</h1>
      <div dangerouslySetInnerHTML={{ __html: recoveryCodes?.recovery_code_instruction }} />
      <pre
        style={{
          lineHeight: '1.8rem',
          whiteSpace: 'pre-wrap',
          marginBottom: '1.875rem',
          textAlign: 'center',
        }}
      >
        {(Array.isArray(recoveryCodes?.recoveryCodes) && recoveryCodes?.recoveryCodes?.join('\n')) ||
          'No codes available'}
      </pre>
      <div className="footer">
        <p className="copyrights">{recoveryCodes?.copyrights}</p>
      </div>
    </div>
  );
});

RecoveryToPrint.displayName = 'RecoveryToPrint';

RecoveryToPrint.propTypes = {
  recoveryCodes: PropTypes.shape({
    recovery_code_instruction: PropTypes.string,
    recoveryCodes: PropTypes.arrayOf(PropTypes.string), // Ensure it's an array of strings
    copyrights: PropTypes.string,
  }),
};

export default RecoveryToPrint;
