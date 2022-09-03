// using API.Data;
// using API.Entities;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using AutoMapper;
using API.DTO;
using API.Errors;

namespace API.Controllers
{
    // [Route("api/[controller]")]
    public class ProductController : BaseController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;

        private  IMapper _mapper { get; }

        // private readonly ILogger<ProductController> _logger;
        // private readonly IProductRepository _productRepository;
        // public ProductController(ILogger<ProductController> logger,IProductRepository productRepository)
        // {
        //     _productRepository = productRepository;
        //     _logger = logger;
        // }

        public ProductController(IGenericRepository<Product> productRepo,
        IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo,
        IMapper mapper)
        {
            _productRepo = productRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>>  GetProducts(){
            // var products = await _productRepository.GetProductsAsync();
            // var products = await _productRepo.ListAllAsync();

            var spec = new ProductsWithTypesAndBrandSpecification();
            var products = await _productRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id){
            // return Ok(await _productRepository.GetProductByIdAsync(id));
            // return Ok(await _productRepo.GetByIdAsync(id));
            var spec = new ProductsWithTypesAndBrandSpecification(id);
            var result = await _productRepo.GetEntityWithSpec(spec);

            if(result is null) return NotFound(new ApiResponse(404)); 
            return Ok(_mapper.Map<Product,ProductToReturnDto>(result));
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>>  GetProductBarnds(){
            // var productBrands = await _productRepository.GetProductBrandsAsync();
            var productBrands = await _productBrandRepo.ListAllAsync();
            return Ok(productBrands);
        }
       [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>>  GetProductTypes(){
            // var productTypes = await _productRepository.GetProductTypeAsync();
            var productTypes = await _productTypeRepo.ListAllAsync();
            return Ok(productTypes);
        }
    }
}