
import { FC } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
}

const FeedsWidget5: FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body pb-0'>
        {/* begin::Header */}
        <div className='d-flex align-items-center mb-5'>
          {/* begin::User */}
          <div className='d-flex align-items-center flex-grow-1'>
            {/* begin::Avatar */}
            <div className='symbol symbol-45px me-5'>
              <img src={toAbsoluteUrl('media/avatars/300-25.jpg')} alt='' />
            </div>
            {/* end::Avatar */}

            {/* begin::Info */}
            <div className='d-flex flex-column'>
              <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                Sam Logan
              </a>

              <span className='text-gray-500 fw-semibold'>Mango, Java, Python</span>
            </div>
            {/* end::Info */}
          </div>
          {/* end::User */}

          {/* begin::Menu */}
          <div className='my-0'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTIcon iconName='category' className='fs-2' />
            </button>
         
          </div>
          {/* end::Menu */}
        </div>
        {/* end::Header */}

        {/* begin::Post */}
        <div className='mb-5'>
          {/* begin::Image */}
          <div
            className='bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5'
            style={{
              backgroundImage: `url('${toAbsoluteUrl('media/stock/900x600/20.jpg')}')`,
            }}
          ></div>
          {/* end::Image */}

          {/* begin::Text */}
          <div className='text-gray-800 mb-5'>
            Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors
            about driving and keep you focused on the overall structure of your post
          </div>
          {/* end::Text */}

          {/* begin::Toolbar */}
          <div className='d-flex align-items-center mb-5'>
            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
            >
              <KTIcon iconName='message-text-2' className='fs-3' />
              89
            </a>

            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2'
            >
              <KTIcon iconName='heart' className='fs-2' />
              29
            </a>
          </div>
          {/* end::Toolbar */}
        </div>
        {/* end::Post */}

        {/* begin::Separator */}
        <div className='separator mb-4'></div>
        {/* end::Separator */}

        {/* begin::Reply input */}
        <form className='position-relative mb-6'>
          <textarea
            className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
            rows={1}
            placeholder='Reply..'
          ></textarea>

          <div className='position-absolute top-0 end-0 me-n5'>
            <span className='btn btn-icon btn-sm btn-active-color-primary pe-0 me-2'>
              <KTIcon iconName='paper-clip' className='fs-3 mb-3' />
            </span>

            <span className='btn btn-icon btn-sm btn-active-color-primary ps-0'>
              <KTIcon iconName='geolocation' className='fs-2 mb-3' />
            </span>
          </div>
        </form>
        {/* edit::Reply input */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {FeedsWidget5}
