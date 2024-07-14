import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import { aboutSetting } from '@settings/about-setting';
import Image from '@components/ui/image';
import Seo from '@components/seo/seo';
import Heading from '@components/ui/heading';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import Button from '@components/ui/button';
import { httpReauest } from 'src/api/api';
import { productGalleryPlaceholder } from '@assets/placeholders';

export default function Membership() {
  const { t } = useTranslation('common');
  const [records, setRecords] = useState([{}]);
  const [massage, setMassege] = useState('');
  const [error, setError] = useState('');
  const [product, setProduct] = useState(['', '', '', '', '', '', '', '']);

  function handleAddBasicRecord() {
    if (records.length <= 7) {
      formik.values.records.push({
        companyName: '',
        position: '',
        startDate: '',
        staffs: '',
        activitydone: '',
      });
      setRecords([...records, {}]);
    }
  }

  const VALUE_SIGN_VALIDATION = () => {
    return Yup.object({
      name: Yup.string().required('required'),
      phone: Yup.string()
        .required('required')
        .max(11, 'the number is wrong')
        .min(11, 'the number is wrong'),
      address: Yup.string().required('required'),
      email: Yup.string().required('required'),
    });
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      activity: '',
      phone: '',
      email: '',
      instagram: '',
      website: '',
      address: '',
      records: [
        {
          companyName: '',
          position: '',
          startDate: '',
          staffs: '',
          activitydone: '',
        },
      ],
      productionName:'',
      capacity:'',
      companyAddress:'',
      product: product,
      about: '',
      market: '',
      resume: ['', '', '', ''],
      exportProject: '',
      referral:''
    },
    validationSchema: VALUE_SIGN_VALIDATION,
    onSubmit: async (values) => {
      const newProduct = values.product.filter((e) => e !== '');
      const newResume = values.resume.filter((e)=>e !== '')
      const newValues = {
        name: values.name,
        activity: values.activity,
        phone: values.phone,
        email: values.email,
        instagram: values.instagram,
        website: values.website,
        address: values.address,
        records: values.records,
        productionName: values.productionName,
        capacity: values.capacity,
        companyAddress: values.companyAddress,
        product: newProduct,
        about: values.about,
        market: values.market,
        reume: newResume,
        exportProject: values.exportProject,
        referral: values.referral
      };
      console.log(formik.errors);
      await httpReauest('POST', '/membership/create', newValues, {})
        .then((data) => {
          console.log(data);
          setMassege('send');
        })
        .catch((data) => {
          setMassege('nosend');
          console.log(data);
          setError(data.massage);
        });
    },
  });
  console.log(formik.errors);
  return (
    <>
      <Seo
        title="Membership"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="membership"
      />
      <div className="lg:mx-[100px] mx-4 px-3 border border-slate-200 rounded-sm mt-8 shadow pb-5">
        <h1 className="text-center font-bold my-7 text-black text-2xl ">
          {t('member-title')}
        </h1>
        <p className="text-center ">{t('member-hi')}</p>
        <p className="text-center lg:mx-[100px]">{t('member-p')}</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:mx-10 gap-4 mt-10">
            <div className="">
              <label className="text-sm mb-2" htmlFor="name">
                {t('member-name')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <small className="text-danger" style={{ color: 'red' }}>
                  {formik.errors.name}
                </small>
              )}
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="activity">
                {' '}
                {t('member-activity')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="activity"
                name="activity"
                value={formik.values.activity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="phone">
                {t('member-phone')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <small className="text-danger" style={{ color: 'red' }}>
                  {formik.errors.phone}
                </small>
              )}
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="email">
                {t('member-email')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <small className="text-danger" style={{ color: 'red' }}>
                  {formik.errors.email}
                </small>
              )}
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="instagram">
                {t('member-instagram')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="instagram"
                name="instagram"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="website">
                {t('member-website')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="website"
                name="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm mb-2" htmlFor="address">
                {t('member-address')}:
              </label>
              <input
                className="shadow w-full h-[42px] appearance-none border border-slate-300 rounded  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.address && formik.touched.address && (
                <small className="text-danger" style={{ color: 'red' }}>
                  {formik.errors.address}
                </small>
              )}
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="name">
              {t("inavite-ref")} :
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="referral"
                name="referral"
                value={formik.values.referral}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              
            </div>
          </div>
          <div>
            <h2 className="text-center font-bold my-7 text-black text-2xl ">
              {t('member-records')}
            </h2>
            <p className="text-center">{t('member-records-p')}</p>
            {records.map((e, i) => (
              <div className="grid lg:grid-cols-4 grid-cols-2  lg:mx-10 gap-4 mt-10">
                <div className="">
                  <label
                    className="text-sm mb-2"
                    htmlFor={`records[${i}].companyName`}
                  >
                    {i + 1}_ {t('member-company')} :
                  </label>
                  <input
                    className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                    type="text"
                    id={`records[${i}].companyName`}
                    name={`records[${i}].companyName`}
                    value={formik.values.records[i]?.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="">
                  <label
                    className="text-sm mb-2"
                    htmlFor={`records[${i}].position`}
                  >
                   {i + 1}_ {t('member-position')}:
                  </label>
                  <input
                    className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                    type="text"
                    id={`records[${i}].position`}
                    name={`records[${i}].position`}
                    value={formik.values.records[i].position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="">
                  <label
                    className="text-sm mb-2"
                    htmlFor={`records[${i}].startDate`}
                  >
                   {i + 1}_ {t('member-date')}:
                  </label>
                  <input
                    className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                    type="date"
                    id={`records[${i}].startDate`}
                    name={`records[${i}].startDate`}
                    value={formik.values.records[i].startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="">
                  <label
                    className="text-sm mb-2"
                    htmlFor={`records[${i}].staffs`}
                  >
                   {i + 1}_ {t('member-staff')}:
                  </label>
                  <input
                    className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                    type="text"
                    id={`records[${i}].staffs`}
                    name={`records[${i}].staffs`}
                    value={formik.values.records[i].staffs}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-span-full">
                  <label
                    className="text-sm mb-2"
                    htmlFor={`records[${i}].activitydone`}
                  >
                   {i + 1}_ {t('member-done')}:
                  </label>
                  <input
                    className="shadow  h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                    type="text"
                    id={`records[${i}].activitydone`}
                    name={`records[${i}].activitydone`}
                    value={formik.values.records[i].activitydone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-6 mb-6">
              <button onClick={handleAddBasicRecord} className="">
                <FaRegPlusSquare size={40} />
              </button>
            </div>
          </div>
          <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 lg:mx-10 mb-10'>
          <h1 className="text-center font-bold my-7 text-black text-2xl col-span-full">
          {t('member-title-2')}
        </h1>
          <div className="">

              <label className="text-sm mb-2" htmlFor="productionName">
                {t('member-productionName')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="productionName"
                name="productionName"
                value={formik.values.productionName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="">
              <label className="text-sm mb-2" htmlFor="capacity">
                {t('member-capacity')}:
              </label>
              <input
                className="shadow h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="capacity"
                name="capacity"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm mb-2" htmlFor="companyAddress">
                {t('member-companyAddress')}:
              </label>
              <input
                className="shadow w-full h-[42px] appearance-none border border-slate-300 rounded  py-2 px-3 text-gray-700  leading-tight"
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={formik.values.companyAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.address && formik.touched.address && (
                <small className="text-danger" style={{ color: 'red' }}>
                  {formik.errors.address}
                </small>
              )}
            </div>

          </div>
          <div className="lg:mx-10 grid grid-cols-2 gap-4">
            <div className="col-span-full grid lg:grid-cols-4 grid-cols-2 gap-4">
              <label className="col-span-full" htmlFor="product">
                {t('member-project')}
              </label>
              {product.map((e, i) => (
                <input
                  className="shadow  h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                  type="text"
                  value={formik.values.product[i]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id={`product[${i}]`}
                  name={`product[${i}]`}
                />
              ))}
            </div>
            <div className="col-span-full">
              <label htmlFor="about">{t('member-about')}</label>
              <textarea
                className="shadow h-[160px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="about"
                id="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="lg:col-span-1 col-span-full">
              <label htmlFor="market">{t('member-market')}:</label>
              <textarea
                className="shadow lg:h-[160px] h-[100px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="market"
                id="market"
                value={formik.values.market}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="lg:col-span-1 col-span-full grid grid-cols-2 gap-4 ">
              <label className='col-span-full' htmlFor="resume">{t('member-resume')}:</label>
              {formik.values.resume.map((e, i) => (
                <input
                  className="shadow  h-[42px] appearance-none border border-slate-300 rounded w-full  py-2 px-3 text-gray-700  leading-tight"
                  type="text"
                  value={formik.values.resume[i]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id={`resume[${i}]`}
                  name={`resume[${i}]`}
                />
              ))}
            </div>
            <div className="col-span-full">
              <label htmlFor="exportProject">{t('member-export')}:</label>
              <textarea
                className="shadow h-[160px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="exportProject"
                id="exportProject"
                value={formik.values.exportProject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="formButton" type="submit">
              {t('t-submit')}
            </Button>
          </div>
          {massage === 'send' && (
            <div className="bg-green-500 flex justify-center items-center text-white py-4 mt-5 rounded-md shadow text-[14px] px-3 lg:text-[18px] lg:mx-10">
              <span>
                Your request has been submitted and will be followed up by our
                colleagues and we will contact you
              </span>
            </div>
          )}
          {massage === 'nosend' && (
            <div className="bg-red-500 flex justify-center items-center text-white py-4 mt-5 rounded-md shadow text-[14px] px-3 lg:text-[18px] lg:mx-10">
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

Membership.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
    },
  };
};
